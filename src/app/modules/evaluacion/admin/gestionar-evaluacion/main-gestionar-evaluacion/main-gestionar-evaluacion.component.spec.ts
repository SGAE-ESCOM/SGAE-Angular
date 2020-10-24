import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGestionarEvaluacionComponent } from './main-gestionar-evaluacion.component';

describe('MainGestionarEvaluacionComponent', () => {
  let component: MainGestionarEvaluacionComponent;
  let fixture: ComponentFixture<MainGestionarEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainGestionarEvaluacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGestionarEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
