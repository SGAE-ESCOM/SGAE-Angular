import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPagosComponent } from './main-pagos.component';

describe('MainPagosComponent', () => {
  let component: MainPagosComponent;
  let fixture: ComponentFixture<MainPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
