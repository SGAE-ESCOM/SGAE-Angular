import { TestBed } from '@angular/core/testing';

import { ValidarDocumentacionService } from './validar-documentacion.service';

describe('ValidarDocumentacionService', () => {
  let service: ValidarDocumentacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarDocumentacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
