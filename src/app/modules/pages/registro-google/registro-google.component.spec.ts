import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroGoogleComponent } from './registro-google.component';

describe('RegistroGoogleComponent', () => {
  let component: RegistroGoogleComponent;
  let fixture: ComponentFixture<RegistroGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
