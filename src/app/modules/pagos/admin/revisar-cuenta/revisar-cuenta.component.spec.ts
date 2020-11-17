import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarCuentaComponent } from './revisar-cuenta.component';

describe('RevisarCuentaComponent', () => {
  let component: RevisarCuentaComponent;
  let fixture: ComponentFixture<RevisarCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisarCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
