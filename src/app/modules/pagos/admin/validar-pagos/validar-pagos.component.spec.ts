import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarPagosComponent } from './validar-pagos.component';

describe('ValidarPagosComponent', () => {
  let component: ValidarPagosComponent;
  let fixture: ComponentFixture<ValidarPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
