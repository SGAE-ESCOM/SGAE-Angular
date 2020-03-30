import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAdmonComponent } from './registrar-admon.component';

describe('RegistrarAdmonComponent', () => {
  let component: RegistrarAdmonComponent;
  let fixture: ComponentFixture<RegistrarAdmonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarAdmonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarAdmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
