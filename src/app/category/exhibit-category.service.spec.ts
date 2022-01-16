import { TestBed } from '@angular/core/testing';

import { ExhibitCategoryService } from './exhibit-category.service';

describe('SubcategoryService', () => {
  let service: ExhibitCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExhibitCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
