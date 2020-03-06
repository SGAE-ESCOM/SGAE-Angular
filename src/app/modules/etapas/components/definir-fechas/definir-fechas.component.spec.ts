import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinirFechasComponent } from './definir-fechas.component';

describe('DefinirFechasComponent', () => {
  let component: DefinirFechasComponent;
  let fixture: ComponentFixture<DefinirFechasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinirFechasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinirFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
