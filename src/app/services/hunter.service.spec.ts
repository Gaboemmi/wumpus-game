import { TestBed } from '@angular/core/testing';

import { HunterService } from './hunter.service';

describe('HunterService', () => {
  let service: HunterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HunterService);
  });

  it('Debe ser creado', () => {
    expect(service).toBeTruthy();
  });
});
