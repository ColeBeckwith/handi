/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GidHttpService } from './gid-http.service';

describe('GidHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GidHttpService]
    });
  });

  it('should ...', inject([GidHttpService], (service: GidHttpService) => {
    expect(service).toBeTruthy();
  }));
});
