import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdminEvaluacionComponent } from './main-admin-evaluacion.component';

describe('MainAdminEvaluacionComponent', () => {
  let component: MainAdminEvaluacionComponent;
  let fixture: ComponentFixture<MainAdminEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAdminEvaluacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAdminEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
