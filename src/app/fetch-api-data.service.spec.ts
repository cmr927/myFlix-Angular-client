import { TestBed } from '@angular/core/testing';

import { MovieAPIService } from './fetch-api-data.service';

describe('MovieAPIService', () => {
  let service: MovieAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
