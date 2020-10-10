import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGruposComponent } from './main-grupos.component';

describe('MainGruposComponent', () => {
  let component: MainGruposComponent;
  let fixture: ComponentFixture<MainGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
