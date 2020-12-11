import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarPagoAspiranteComponent } from './validar-pago-aspirante.component';

describe('ValidarPagoAspiranteComponent', () => {
  let component: ValidarPagoAspiranteComponent;
  let fixture: ComponentFixture<ValidarPagoAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarPagoAspiranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarPagoAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
