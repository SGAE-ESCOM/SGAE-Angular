import { TestBed } from '@angular/core/testing';

import { EvidenciasPagosService } from './evidencias-pagos.service';

describe('EvidenciasPagosService', () => {
  let service: EvidenciasPagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvidenciasPagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
