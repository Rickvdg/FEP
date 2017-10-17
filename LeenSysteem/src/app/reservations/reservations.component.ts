import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  items: FirebaseListObservable<any[]>;

  constructor(
    public database: AngularFireDatabase
  ) {
    this.items = database.list('/leningen-test');
  }

  ngOnInit() {
  }

  uitlenen(leningId: string) {
    // this.items.update()
    console.log()
  }
}
