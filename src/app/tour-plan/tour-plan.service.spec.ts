import { TestBed } from '@angular/core/testing';

import { TourPlanService } from './tour-plan.service';

describe('ShoppingCartService', () => {
  let service: TourPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
