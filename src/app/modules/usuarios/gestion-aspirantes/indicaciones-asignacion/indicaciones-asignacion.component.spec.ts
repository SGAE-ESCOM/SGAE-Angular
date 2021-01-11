import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicacionesAsignacionComponent } from './indicaciones-asignacion.component';

describe('IndicacionesAsignacionComponent', () => {
  let component: IndicacionesAsignacionComponent;
  let fixture: ComponentFixture<IndicacionesAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicacionesAsignacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicacionesAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
