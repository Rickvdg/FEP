///<reference path="../../../node_modules/@angular/forms/src/validators.d.ts"/>
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {
  productList: FirebaseListObservable<any[]>;
  basketList: Array<any> = [];

  product: string;
  qty: number = 0;
  maxQty: number = 0;

  minMaxControl = new FormControl("", [Validators.max(20), Validators.min(0)]);

  constructor( public database: AngularFireDatabase, public dialog: MatDialog) {
    this.productList = this.database.list('/catalog-products');

  }

  ngOnInit() {
  }

  addToBasket() {
    let tuple = [this.product, this.qty];
    this.basketList.push(tuple);
    console.log(this.basketList);
  }

  openDialog(productName: string, maxQty: number) {
    this.product = productName;
    this.qty = 0;
    this.maxQty = maxQty;

    let dialogRef = this.dialog.open(BasketQtyDialog, {
      width: '500px',
      data: { productName: this.product, qty: this.qty, maxQty: this.maxQty}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.qty = result;

      console.log(this.qty > 0);

      if(this.qty != 0 && this.qty != null){
        this.addToBasket()
      }

    });
  }
}

@Component({
  selector: 'basket-qty-dialog',
  templateUrl: 'basket-qty-dialog.html',
  styleUrls: ['./catalog.component.css']
})
export class BasketQtyDialog {
  minMaxControl = new FormControl("", [ Validators.max(this.data.maxQty),
                                        Validators.min(1),
                                        Validators.required]);

  constructor( public dialogRef: MatDialogRef<BasketQtyDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
