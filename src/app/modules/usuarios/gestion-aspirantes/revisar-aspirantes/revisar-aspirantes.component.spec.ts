import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarAspirantesComponent } from './revisar-aspirantes.component';

describe('GestionAspirantesComponent', () => {
  let component: RevisarAspirantesComponent;
  let fixture: ComponentFixture<RevisarAspirantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisarAspirantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarAspirantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
