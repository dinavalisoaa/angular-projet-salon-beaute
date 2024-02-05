import { TestBed } from '@angular/core/testing';

import { CheckErrorService } from './check-error.service';

describe('CheckErrorService', () => {
  let service: CheckErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
