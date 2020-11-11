import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCuentasComponent } from './gestionar-cuentas.component';

describe('GestionarCuentasComponent', () => {
  let component: GestionarCuentasComponent;
  let fixture: ComponentFixture<GestionarCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarCuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
