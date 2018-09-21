import { TestBed, inject } from '@angular/core/testing';

import { LeafletPointsService } from './leaflet-points.service';

describe('LeafletPointsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeafletPointsService]
    });
  });

  it('should be created', inject([LeafletPointsService], (service: LeafletPointsService) => {
    expect(service).toBeTruthy();
  }));
});
