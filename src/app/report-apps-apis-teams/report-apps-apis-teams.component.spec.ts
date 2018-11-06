import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAppsApisTeamsComponent } from './report-apps-apis-teams.component';

describe('ReportAppsApisTeamsComponent', () => {
  let component: ReportAppsApisTeamsComponent;
  let fixture: ComponentFixture<ReportAppsApisTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAppsApisTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAppsApisTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
