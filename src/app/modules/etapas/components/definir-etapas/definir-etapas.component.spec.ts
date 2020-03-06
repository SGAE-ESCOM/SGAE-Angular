import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinirEtapasComponent } from './definir-etapas.component';

describe('DefinirEtapasComponent', () => {
  let component: DefinirEtapasComponent;
  let fixture: ComponentFixture<DefinirEtapasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinirEtapasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinirEtapasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
