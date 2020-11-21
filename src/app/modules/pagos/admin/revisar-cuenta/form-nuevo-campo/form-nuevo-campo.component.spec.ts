import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNuevoCampoComponent } from './form-nuevo-campo.component';

describe('FormNuevoCampoComponent', () => {
  let component: FormNuevoCampoComponent;
  let fixture: ComponentFixture<FormNuevoCampoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNuevoCampoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNuevoCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
