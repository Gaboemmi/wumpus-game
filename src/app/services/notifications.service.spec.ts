import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsService);
  });

  it('Debe ser creado', () => {
    expect(service).toBeTruthy();
  });
});
