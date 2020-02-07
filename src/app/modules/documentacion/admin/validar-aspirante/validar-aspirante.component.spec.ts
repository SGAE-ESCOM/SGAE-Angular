import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarAspiranteComponent } from './validar-aspirante.component';

describe('ValidarAspiranteComponent', () => {
  let component: ValidarAspiranteComponent;
  let fixture: ComponentFixture<ValidarAspiranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarAspiranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
