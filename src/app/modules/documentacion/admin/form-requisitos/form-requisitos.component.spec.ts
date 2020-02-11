import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequisitosComponent } from './form-requisitos.component';

describe('FormRequisitosComponent', () => {
  let component: FormRequisitosComponent;
  let fixture: ComponentFixture<FormRequisitosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRequisitosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequisitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
