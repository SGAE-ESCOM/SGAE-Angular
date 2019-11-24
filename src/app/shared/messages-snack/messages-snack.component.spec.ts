import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesSnackComponent } from './messages-snack.component';

describe('MessagesSnackComponent', () => {
  let component: MessagesSnackComponent;
  let fixture: ComponentFixture<MessagesSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesSnackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
