import { TestBed } from '@angular/core/testing';

import { GoodiesService } from './goodies.service';

describe('GoodiesService', () => {
  let service: GoodiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
