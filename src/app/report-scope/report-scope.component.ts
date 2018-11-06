import { Component, OnInit, Input } from '@angular/core';
import { Report } from '../report';

@Component({
  selector: 'app-report-scope',
  templateUrl: './report-scope.component.html',
  styleUrls: ['./report-scope.component.css']
})
export class ReportScopeComponent implements OnInit {
  @Input() report: Report;

  constructor() { }

  ngOnInit() {
  }

}
