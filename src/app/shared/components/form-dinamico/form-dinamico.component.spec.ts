import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDinamicoComponent } from './form-dinamico.component';

describe('FormDinamicoComponent', () => {
  let component: FormDinamicoComponent;
  let fixture: ComponentFixture<FormDinamicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDinamicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDinamicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
