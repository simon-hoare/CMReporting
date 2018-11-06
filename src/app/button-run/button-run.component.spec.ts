import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRunComponent } from './button-run.component';

describe('ButtonRunComponent', () => {
  let component: ButtonRunComponent;
  let fixture: ComponentFixture<ButtonRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
