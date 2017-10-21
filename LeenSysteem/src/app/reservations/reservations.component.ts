import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {AuthenticationService} from "../authentication.service";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  today: number = Date.now();
  items: FirebaseListObservable<any[]>;
  itemsUid: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any>;

  name: string = '';

  constructor(
    public database: AngularFireDatabase,
    public auth: AuthenticationService
  ) {
    this.items = database.list('/leningen-test');
  }

  filter(value: any, status: string) : boolean{
    // Return false if don't want this job in the results.
    if (value.status == status){
      return false;
    }
    return true;
  }

  ngOnInit() {
  }

  uitlenen(uid: string, status: string) {
    this.item = this.database.object('/leningen-test/'+uid);
    console.log(this.item);
    this.item.update({ status: status });
  }

  addLening(inleverdatum: string, uitleendatum: string, status: string) {
    let aRef = this.items.push({});
    console.log(aRef.key);
    aRef.set({
      inleverdatum: inleverdatum,
      uitleendatum: uitleendatum,
      lener: this.auth.getDisplayName(),
      lenermail: this.auth.getEmail(),
      status: status,
      producten: {
        1: {id: 'Arduino NAno', aantal: 2},
        2: {id: 'Arduino Uno', aantal: 1}
      }
    })
  }

  getProduct(id: string) {
    this.item = this.database.object('/catalog-products/'+id, { preserveSnapshot: true });
    this.item.subscribe(snapshot => {
      // console.log(snapshot.val().name);
      this.name = snapshot.val().name;
    });
    return this.name;
  }
}
