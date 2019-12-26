import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEvaluacionComponent } from './main-evaluacion.component';

describe('MainEvaluacionComponent', () => {
  let component: MainEvaluacionComponent;
  let fixture: ComponentFixture<MainEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
