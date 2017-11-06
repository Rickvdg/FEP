import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { CatalogProductComponent } from "../catalog-product/catalog-product.component";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  productList: FirebaseListObservable<any[]>;

  constructor(
    public database: AngularFireDatabase
  ) {
    this.productList = this.database.list('/catalog-products');


  }

  ngOnInit() {
  }


  openCreateProductDialog() {
    let dialogRef = this.dialog.open(CatalogProductComponent, {
      width: '500px',
    });
  }

}
