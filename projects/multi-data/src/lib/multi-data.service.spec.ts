import { TestBed } from '@angular/core/testing';

import { MultiDataService } from './multi-data.service';

describe('MultiDataService', () => {
  let service: MultiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
