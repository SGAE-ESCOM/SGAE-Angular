import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEtapasComponent } from './main-etapas.component';

describe('MainEtapasComponent', () => {
  let component: MainEtapasComponent;
  let fixture: ComponentFixture<MainEtapasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainEtapasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEtapasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
