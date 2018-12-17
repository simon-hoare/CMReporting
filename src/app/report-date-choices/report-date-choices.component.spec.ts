import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDateChoicesComponent } from './report-date-choices.component';

describe('ReportDateChoicesComponent', () => {
  let component: ReportDateChoicesComponent;
  let fixture: ComponentFixture<ReportDateChoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDateChoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDateChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
