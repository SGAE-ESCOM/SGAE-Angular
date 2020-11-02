import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSimuladorComponent } from './main-simulador.component';

describe('MainSimuladorComponent', () => {
  let component: MainSimuladorComponent;
  let fixture: ComponentFixture<MainSimuladorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSimuladorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSimuladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
