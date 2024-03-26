import { TestBed } from '@angular/core/testing';

import { Step3GuardService } from './step3-guard.service';

describe('Step3GuardService', () => {
  let service: Step3GuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Step3GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
