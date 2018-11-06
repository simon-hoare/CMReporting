import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDateComponent } from './report-date.component';

describe('HeroDateComponent', () => {
  let component: ReportDateComponent;
  let fixture: ComponentFixture<ReportDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
