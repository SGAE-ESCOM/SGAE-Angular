import { TestBed } from '@angular/core/testing';

import { SubirDocumentacionService } from './subir-documentacion.service';

describe('SubirDocumentacionService', () => {
  let service: SubirDocumentacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirDocumentacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
