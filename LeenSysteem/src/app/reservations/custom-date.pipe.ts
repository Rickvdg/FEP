import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  splits: string[] = [];
  date: Date;
  today = new Date();

  transform(value: string): any {
    this.splits = value.split('-');
    this.date = new Date(Number(this.splits[2]),Number(this.splits[1])-1,Number(this.splits[0]));
    // console.log(this.date, ', today: ', this.today, ' | inleverdatum > today: ', this.date > this.today);
    return this.date;
  }
}
