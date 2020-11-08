import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSimuladorComponent } from './crear-simulador.component';

describe('CrearSimuladorComponent', () => {
  let component: CrearSimuladorComponent;
  let fixture: ComponentFixture<CrearSimuladorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSimuladorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSimuladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
