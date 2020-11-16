import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNuevaCuentaComponent } from './form-nueva-cuenta.component';

describe('FormNuevaCuentaComponent', () => {
  let component: FormNuevaCuentaComponent;
  let fixture: ComponentFixture<FormNuevaCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNuevaCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNuevaCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
