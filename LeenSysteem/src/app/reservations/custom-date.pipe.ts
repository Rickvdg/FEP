import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  splits: string[] = [];
  year: string;
  date: Date;
  today = new Date();

  transform(value: string): any {
    this.splits = value.split('-');
    this.year = this.splits[2].split(" ")[0];
    this.date = new Date(Number(this.year),Number(this.splits[1])-1,Number(this.splits[0]));
    // console.log(this.date, ', today: ', this.today, ' | inleverdatum > today: ', this.date > this.today);
    return this.date;
  }
}
