import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAspiranteComponent } from './ver-aspirante.component';

describe('VerAspiranteComponent', () => {
  let component: VerAspiranteComponent;
  let fixture: ComponentFixture<VerAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerAspiranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
