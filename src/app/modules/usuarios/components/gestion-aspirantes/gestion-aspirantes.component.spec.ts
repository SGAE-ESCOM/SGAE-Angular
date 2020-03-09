import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAspirantesComponent } from './gestion-aspirantes.component';

describe('GestionAspirantesComponent', () => {
  let component: GestionAspirantesComponent;
  let fixture: ComponentFixture<GestionAspirantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionAspirantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAspirantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
