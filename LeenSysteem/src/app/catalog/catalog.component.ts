import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter, NativeDateAdapter, MatDatepicker} from '@angular/material';



@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {
  productList: FirebaseListObservable<any[]>;

  openBasket(): void {
    let dialogRef = this.dialog.open(BasketConfirmationDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  constructor(public database: AngularFireDatabase,
              public dialog: MatDialog, dateAdapter: DateAdapter<NativeDateAdapter>) {
    this.productList = this.database.list('/catalog-products');
    dateAdapter.setLocale('nl-NL');
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'basket-confirmation-dialog',
  templateUrl: 'basket-confirmation-dialog.html',
  styleUrls: ['basket-confirmation-dialog.css']
})
export class BasketConfirmationDialog {
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  minDate = new Date();
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }
}
