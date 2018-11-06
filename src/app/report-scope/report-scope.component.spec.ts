import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportScopeComponent } from './report-scope.component';

describe('ReportScopeComponent', () => {
  let component: ReportScopeComponent;
  let fixture: ComponentFixture<ReportScopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportScopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
