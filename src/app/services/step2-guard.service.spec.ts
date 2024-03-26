import { TestBed } from '@angular/core/testing';

import { Step2GuardService } from './step2-guard.service';

describe('Step2GuardService', () => {
  let service: Step2GuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Step2GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
