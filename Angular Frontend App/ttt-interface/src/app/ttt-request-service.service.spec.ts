import { TestBed } from '@angular/core/testing';

import { TttRequestServiceService } from './ttt-request-service.service';

describe('TttRequestServiceService', () => {
  let service: TttRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TttRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
