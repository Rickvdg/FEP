import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database-deprecated";
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: FirebaseListObservable<any[]>;
  user: FirebaseObjectObservable<any[]>;
  selectedValue: string;
  latestChangeEvent: MatSelectChange;

  rollen: [
    { key: 'admin', value: 'Admin' },
    { key: 'moderator', value: 'Moderator' },
    { key: 'user', value: 'User' }
  ]

  constructor(
    public database: AngularFireDatabase
  ) {
    this.users = database.list('/admins');
    console.log('Users: ', this.users);
  }

  ngOnInit() {
  }

  addUser(email: string, rol: string) {
    this.users.push({
      email: email,
      rol: rol
    })
  }

  changeRole(key: string, rol: string) {
    this.user = this.database.object("/admins/"+key);
    this.user.update({ rol: rol });
  }

  log(value: string) { console.log(value); }
}
