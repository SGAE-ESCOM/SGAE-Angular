import { TestBed } from '@angular/core/testing';

import { AdministrarDocumentacionService } from './administrar-documentacion.service';

describe('AdministrarDocumentacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdministrarDocumentacionService = TestBed.get(AdministrarDocumentacionService);
    expect(service).toBeTruthy();
  });
});
