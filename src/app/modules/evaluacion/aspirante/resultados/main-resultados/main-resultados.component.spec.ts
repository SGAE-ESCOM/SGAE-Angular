import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainResultadosComponent } from './main-resultados.component';

describe('MainResultadosComponent', () => {
  let component: MainResultadosComponent;
  let fixture: ComponentFixture<MainResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainResultadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
