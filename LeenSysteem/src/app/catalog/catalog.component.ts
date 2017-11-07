///<reference path="../../../node_modules/@angular/forms/src/validators.d.ts"/>
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { CatalogProductComponent } from "../catalog-product/catalog-product.component";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter, NativeDateAdapter, MatDatepicker} from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {
  // All product from database
  productList: FirebaseListObservable<any[]>;

  // List (of tuples) with all products in basket
  basketList: Array<any> = [];

  // Selected product to add to list
  product: string;

  // Max qty of selected product
  maxQty: number = 0;



  itemsToReserve: FirebaseListObservable<any[]>;






  constructor(public database: AngularFireDatabase, public dialog: MatDialog, dateAdapter: DateAdapter<NativeDateAdapter>, public auth: AuthenticationService) {
    this.productList = this.database.list('/catalog-products');

    ///////////
    this.itemsToReserve = database.list('/leningen-test');
    //////////


  }

  ngOnInit() {
  }


  /**
   * Opens a dialog to add a new product to the database.
   */
  openCreateProductDialog() {
    let dialogRef = this.dialog.open(CatalogProductComponent, {
      width: '500px',
    });
  }

  /**
   * Adds the selected product to the basketList.
   * BasketList is an array of tuples.
   */
  addToBasket(qty: number) {
    var x;
    for(let i in this.basketList){
      x = -1;

      /**
       * If item is already in basketList set x to the array key for later use.
       */
      if(this.basketList[i][0] == this.product){
        qty = qty + this.basketList[i][1];
        x = +i;
        break;
      }
    }

    let productToAdd = [this.product, qty];

    /**
     * If x != -1, thus altered to a array key replace the item
     * else add it.
     */
    if(x != -1){
      this.basketList.splice(x, 1, productToAdd);
    }else{
      this.basketList.push(productToAdd);
    }
  }

  /**
   * Open the Qty dialog for selecting the qty of a product to add to the basketList.
   */
  openQtyDialog(productName: string, maxQty: number) {
    this.product = productName;
    this.maxQty = this.defineMaxQty(productName, maxQty);

    /**
     * Qty dialog with some basic settings and setting the data attribute
     * Data attribute is required to get minMaxControl FormControl working.
     */
    let dialogRef = this.dialog.open(BasketQtyDialog, {
      width: '500px',
      data: { productName: this.product, qty: 0, maxQty: this.maxQty}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      /**
       * afterClosed() will alway be called, even if user selected cancel.
       * This checks if the result is within the min, max range before calling addToBasket().
       *
       * Sends result (which is the selected qty of a product) to addToBasket().
       */
      if(result >= 1 || result <= this.maxQty || result != null){
        this.addToBasket(result);
      }
    });
  }
  /**
   * Defines the max qty of the selected product that can be ordered.
   * It looks at the max qty of the selected product in the database
   * and if the selected product is already in the basketList.
   *
   * return = maxQty - qty of basketList OR
   * return = maxQty.
   */
  defineMaxQty(productName: string, maxQty: number){
    for (let product of this.basketList){
      if(product[0] == productName){
        maxQty = maxQty - product[1];
      }
    }
    return maxQty;
  }

  openBasket(){

    let dialogRef = this.dialog.open(BasketConfirmationDialog, {
      width: '500px',
      data : { test: this.basketList}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if(result != null){
        console.log(result);
        this.reserveBasket(result);
      }

    });
  }


  reserveBasket(uitleendatum: string) {
    console.log(uitleendatum)
    let stringToDate = new Date(uitleendatum);
    console.log(stringToDate)
    let inleverdatum = new Date(stringToDate.getTime() + (1000 * 60 * 60 * 24 * 7));
    console.log(inleverdatum)

    let tempArr: Array<any> = [];
    let arr: Array<any> = [];

    for(let i of this.basketList){

      let aantal: string[] = ["aantal", [i][1]];
      let name: string[] = ["id", [i][0]];

      arr.push(aantal);
      arr.push(name);

      tempArr.push(arr);
    }

    let aRef = this.itemsToReserve.push({});
    aRef.set({
      inleverdatum: '30-11-2017',
      uitleendatum: uitleendatum,
      lener: this.auth.getDisplayName(),
      lenermail: this.auth.getEmail(),
      status: "gereserveerd",
      // producten: tempArr
      producten: {
        1: {id: 'Arduino NAno', aantal: 2},
        2: {id: 'Arduino Uno', aantal: 1}
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
  /**
   * Validator for the qty selection.
   * Max = return of defineMaxQty().
   * Min = 1.
   * Required = true.
   */
  minMaxControl = new FormControl("", [ Validators.max(this.data.maxQty), Validators.min(1), Validators.required]);

  constructor( public dialogRef: MatDialogRef<BasketQtyDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'basket-confirmation-dialog',
  templateUrl: 'basket-confirmation-dialog.html',
  styleUrls: ['basket-confirmation-dialog.css']
})

export class BasketConfirmationDialog {

  constructor( public dialogRef: MatDialogRef<BasketQtyDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {  }

  minDate = new Date();
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
