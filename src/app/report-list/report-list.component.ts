import { Component, OnInit } from '@angular/core';
import { Report } from '../report'; 
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

    reports : Report[];
    selectedReport: Report;

  constructor(private reportsService: ReportsService) { }

  getReports(): void {
    this.reports = this.reportsService.getReports(); 
  }

onSelect(thisreport: Report): void {
  this.selectedReport = thisreport;
}

  ngOnInit() {
    this.getReports();
		this.selectedReport = this.reports[0];
  }

}