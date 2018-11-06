import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from '../report';
import { ReportsService } from '../reports.service';

@Component(
{

  selector: 'app-button-run',

  templateUrl: './button-run.component.html',

  styleUrls: ['./button-run.component.css']

})

export class ButtonRunComponent implements OnInit {


@Input() report: Report;


  constructor(private router: Router, private reportService: ReportsService) { }


  ngOnInit() {
  }


   ButtonEvent(event) {
    this.router.navigateByUrl('/report/' + this.report.id);
  }
 
}
