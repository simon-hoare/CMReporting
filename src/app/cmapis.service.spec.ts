import { TestBed } from '@angular/core/testing';

import { CMAPisService } from './cmapis.service';

describe('CMAPisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CMAPisService = TestBed.get(CMAPisService);
    expect(service).toBeTruthy();
  });
});
