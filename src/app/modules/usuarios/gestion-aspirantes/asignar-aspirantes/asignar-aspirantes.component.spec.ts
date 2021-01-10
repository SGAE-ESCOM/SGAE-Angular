import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAspirantesComponent } from './asignar-aspirantes.component';

describe('ValidarAspirantesComponent', () => {
  let component: AsignarAspirantesComponent;
  let fixture: ComponentFixture<AsignarAspirantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarAspirantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarAspirantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
