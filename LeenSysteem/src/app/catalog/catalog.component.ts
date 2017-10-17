import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  items: FirebaseListObservable<any[]>;

  constructor(
    public database: AngularFireDatabase
  ) {
    this.items = database.list('/catalog-test');
  }

  ngOnInit() {
  }

  addLening(newLening: string) {
    let aRef = this.items.push({});
    console.log(aRef.key);
    aRef.set({ id: aRef.key, lening: newLening })
  }
}
