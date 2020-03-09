import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAdmonComponent } from './gestion-admon.component';

describe('GestionAdmonComponent', () => {
  let component: GestionAdmonComponent;
  let fixture: ComponentFixture<GestionAdmonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionAdmonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAdmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
