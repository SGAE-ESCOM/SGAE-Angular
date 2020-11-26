import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAplicacionComponent } from './main-aplicacion.component';

describe('MainAplicacionComponent', () => {
  let component: MainAplicacionComponent;
  let fixture: ComponentFixture<MainAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAplicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
