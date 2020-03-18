import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenarRequisitosComponent } from './ordenar-requisitos.component';

describe('OrdenarRequisitosComponent', () => {
  let component: OrdenarRequisitosComponent;
  let fixture: ComponentFixture<OrdenarRequisitosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenarRequisitosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenarRequisitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
