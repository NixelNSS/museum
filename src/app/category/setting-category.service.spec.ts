import { TestBed } from '@angular/core/testing';

import { SettingCategoryService } from './setting-category.service';

describe('CategoryService', () => {
  let service: SettingCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
