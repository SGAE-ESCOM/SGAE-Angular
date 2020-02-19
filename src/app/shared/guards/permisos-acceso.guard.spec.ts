import { TestBed } from '@angular/core/testing';

import { PermisosAccesoGuard } from './permisos-acceso.guard';

describe('PermisosAccesoGuard', () => {
  let guard: PermisosAccesoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermisosAccesoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
