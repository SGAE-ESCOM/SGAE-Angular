import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdminEvaluacionComponent } from './form-admin-evaluacion.component';

describe('FormAdminEvaluacionComponent', () => {
  let component: FormAdminEvaluacionComponent;
  let fixture: ComponentFixture<FormAdminEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAdminEvaluacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAdminEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
