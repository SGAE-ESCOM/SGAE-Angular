import { TestBed } from '@angular/core/testing';

import { CuentasPagosService } from './cuentas-pagos.service';

describe('CuentasBancosService', () => {
  let service: CuentasPagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentasPagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
