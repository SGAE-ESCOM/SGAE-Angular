import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTablasComponent } from './main-tablas.component';

describe('MainTablasComponent', () => {
  let component: MainTablasComponent;
  let fixture: ComponentFixture<MainTablasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTablasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTablasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
