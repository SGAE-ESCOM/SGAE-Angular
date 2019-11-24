import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewButtonsComponent } from './view-buttons.component';

describe('ViewButtonsComponent', () => {
  let component: ViewButtonsComponent;
  let fixture: ComponentFixture<ViewButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
