import { TestBed } from '@angular/core/testing';

import { ControlDeEtapaService } from './control-de-etapa.service';

describe('ControlDeEtapaService', () => {
  let service: ControlDeEtapaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlDeEtapaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
