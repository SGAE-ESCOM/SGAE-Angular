import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGestionAspirantesComponent } from './main-gestion-aspirantes.component';

describe('MainGestionAspirantesComponent', () => {
  let component: MainGestionAspirantesComponent;
  let fixture: ComponentFixture<MainGestionAspirantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainGestionAspirantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGestionAspirantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
