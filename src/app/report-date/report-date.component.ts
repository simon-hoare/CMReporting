import { Component, OnInit, Input } from '@angular/core';
import { Report } from '../report';

/** Took this out because we can't do arbitrary date range queries */

@Component
(
{

  selector: 'app-report-date',

  templateUrl: './report-date.component.html',

  styleUrls: ['./report-date.component.css']

}
)

export class ReportDateComponent 
implements OnInit {

 

@Input() report: Report;


constructor() {  

 }

  

ngOnInit() {




  }




}
