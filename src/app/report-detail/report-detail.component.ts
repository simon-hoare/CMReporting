import { Component, OnInit, Input } from '@angular/core';


import { Report } from '../report';


@Component(
{
  
  selector: 'app-report-detail',

  templateUrl: './report-detail.component.html',

  styleUrls: ['./report-detail.component.css']

}
)

export class ReportDetailComponent 
implements OnInit 
{

  
@Input() report: Report;
constructor() { }

  
ngOnInit() {
  }


}
