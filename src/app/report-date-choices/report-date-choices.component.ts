import { Component, OnInit, Input } from '@angular/core';
import { Report } from '../report';

@Component({
  selector: 'app-report-date-choices',
  templateUrl: './report-date-choices.component.html',
  styleUrls: ['./report-date-choices.component.css']
})
export class ReportDateChoicesComponent implements OnInit {
  @Input() report: Report;
  constructor() { }

  ngOnInit() {
    this.report.yearchoice = ReportDateChoicesComponent.getThisYear();
    this.report.monthchoice = ReportDateChoicesComponent.getThisYear() + "-" + (ReportDateChoicesComponent.getThisMonth()+1);
  }

  // this methods formats the date/time in the way required to call CM
public static getThisYear():number {
  let now = new Date();
  return now.getFullYear();
}

public static getThisMonth():number {
  let now = new Date();
  return now.getMonth();
}

public static getMinMonthYear():number {
  let now = new Date();
  return now.getFullYear() - 4;
}


}
