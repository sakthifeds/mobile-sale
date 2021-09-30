import { TestBed } from '@angular/core/testing';

import { TestinService } from './testin.service';

describe('TestinService', () => {
  let service: TestinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
