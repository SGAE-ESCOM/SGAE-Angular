import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarDocumentacionComponent } from './administrar-documentacion.component';

describe('AdministrarDocumentacionComponent', () => {
  let component: AdministrarDocumentacionComponent;
  let fixture: ComponentFixture<AdministrarDocumentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarDocumentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
