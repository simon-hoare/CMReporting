import { Injectable } from '@angular/core';
import { Report } from './report';
import { REPORTS } from './report-list';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  reportlist:Report[] = REPORTS;

  constructor() {
    for (let item of this.reportlist) {
      item.startDate = ReportsService.getNextMonth(item.endDate);
    }
   }
  public static getNextMonth( enddate:Date): Date {
    let startDate:Date = new Date(enddate);
    startDate.setDate(1);
    return startDate;
  }
  getReports(): Report[] {

    return this.reportlist;
  }
}
