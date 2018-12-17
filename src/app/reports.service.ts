import { Injectable } from '@angular/core';
import { Report } from './report';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  reportlist:Array<Report> = new Array();


  constructor() {
    this.reportlist.push(new Report(1, 'API metrics by application', "","","00:00","23:59","All","","2018-05",2015,"Today"));
    this.reportlist.push(new Report(2, 'API metrics by application with team members', "","","00:00","23:59","All","","2018-05",2015,"Today"));
    this.reportlist.push(new Report(3, 'API metrics by application and operation', "","","00:00","23:59","All","","2018-05",2015,"Today"));
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
