import { TestBed } from '@angular/core/testing';

import { SharedContactService } from './shared-contact.service';

describe('SharedContactService', () => {
  let service: SharedContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
