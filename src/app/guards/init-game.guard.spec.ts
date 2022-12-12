import { TestBed } from '@angular/core/testing';

import { InitGameGuard } from './init-game.guard';

describe('InitGameGuard', () => {
  let guard: InitGameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InitGameGuard);
  });

  it('Debe ser creado', () => {
    expect(guard).toBeTruthy();
  });
});
