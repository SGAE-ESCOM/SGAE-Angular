import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenciaPagoComponent } from './evidencia-pago.component';

describe('EvidenciaPagoComponent', () => {
  let component: EvidenciaPagoComponent;
  let fixture: ComponentFixture<EvidenciaPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenciaPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenciaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
