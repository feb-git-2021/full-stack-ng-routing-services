import { TestBed } from '@angular/core/testing';

import { Cache.InterceptorService } from './cache.interceptor.service';

describe('Cache.InterceptorService', () => {
  let service: Cache.InterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cache.InterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
