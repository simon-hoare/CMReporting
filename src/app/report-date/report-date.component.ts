import { Component, OnInit, Input } from '@angular/core';
import { Report } from '../report';


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
