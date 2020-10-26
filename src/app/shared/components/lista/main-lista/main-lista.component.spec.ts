import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListaComponent } from './main-lista.component';

describe('MainListaComponent', () => {
  let component: MainListaComponent;
  let fixture: ComponentFixture<MainListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
