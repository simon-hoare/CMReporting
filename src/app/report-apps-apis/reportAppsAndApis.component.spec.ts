import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { reportAppsAndApisComponent } from './reportAppsAndApis.component';

describe('ReportComponent', () => {
  let component: reportAppsAndApisComponent;
  let fixture: ComponentFixture<reportAppsAndApisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ reportAppsAndApisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(reportAppsAndApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
