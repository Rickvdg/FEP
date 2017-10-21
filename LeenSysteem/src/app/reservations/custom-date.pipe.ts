import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from "rxjs";

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  splits: any[] = [];
  date: Date;
  today = new Date();

// , args?: any
  transform(value: string): any {
    this.splits = value.split('-');
    this.date = new Date(this.splits[2],this.splits[1],this.splits[0]);
    // console.log(this.date, ', today: ', this.today);
    return this.date;
  }

}
