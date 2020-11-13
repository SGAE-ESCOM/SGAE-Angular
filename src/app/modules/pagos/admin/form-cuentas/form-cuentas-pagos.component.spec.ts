import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCuentasPagosComponent } from './form-cuentas-pagos.component';

describe('FormCuentasComponent', () => {
  let component: FormCuentasPagosComponent;
  let fixture: ComponentFixture<FormCuentasPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCuentasPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCuentasPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
