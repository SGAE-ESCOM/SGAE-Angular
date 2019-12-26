import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainConvocatoriaComponent } from './main-convocatoria.component';

describe('MainConvocatoriaComponent', () => {
  let component: MainConvocatoriaComponent;
  let fixture: ComponentFixture<MainConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
