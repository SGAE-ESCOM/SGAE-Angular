import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDocumentacionComponent } from './main-documentacion.component';

describe('MainDocumentacionComponent', () => {
  let component: MainDocumentacionComponent;
  let fixture: ComponentFixture<MainDocumentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDocumentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
