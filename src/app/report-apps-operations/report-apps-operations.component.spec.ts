import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAppsOperationsComponent } from './report-apps-operations.component';

describe('ReportAppsOperationsComponent', () => {
  let component: ReportAppsOperationsComponent;
  let fixture: ComponentFixture<ReportAppsOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAppsOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAppsOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
