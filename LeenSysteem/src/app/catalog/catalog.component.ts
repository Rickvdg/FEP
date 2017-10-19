import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

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

}
