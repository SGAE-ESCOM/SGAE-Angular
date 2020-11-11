import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarReferenciasComponent } from './configurar-referencias.component';

describe('ConfigurarReferenciasComponent', () => {
  let component: ConfigurarReferenciasComponent;
  let fixture: ComponentFixture<ConfigurarReferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurarReferenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarReferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
