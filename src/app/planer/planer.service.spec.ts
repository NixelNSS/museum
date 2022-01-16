import { TestBed } from '@angular/core/testing';

import { PlanerService } from './planer.service';

describe('OrdersService', () => {
  let service: PlanerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
