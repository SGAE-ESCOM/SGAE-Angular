import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPreguntasComponent } from './main-preguntas.component';

describe('MainPreguntasComponent', () => {
  let component: MainPreguntasComponent;
  let fixture: ComponentFixture<MainPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPreguntasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
