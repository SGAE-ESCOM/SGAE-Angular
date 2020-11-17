import { TestBed } from '@angular/core/testing';

import { AdminEvaluacionesService } from './admin-evaluaciones.service';

describe('AdminEvaluacionesService', () => {
  let service: AdminEvaluacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEvaluacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
