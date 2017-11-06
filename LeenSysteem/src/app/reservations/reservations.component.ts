import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {AuthenticationService} from "../authentication.service";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  today: number = Date.now();
  today2: Date = new Date();
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any>;

  name: string = '';

  constructor(
    public database: AngularFireDatabase,
    public auth: AuthenticationService,
    public snackBar: MatSnackBar
  ) {
    this.items = database.list('/leningen-test');
    this.today2 = new Date();
  }

  getDateString(date: Date, plusDays: number) : string {
    return (date.getDay() + plusDays) + '-' + date.getMonth() + '-' + date.getFullYear();
  }

  filter(value: any, status: string) : boolean {
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
    // this.snackBar.open('De status is veranderd naar \''+status+'\'.', { duration: 2000 });
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
