import { TestBed } from '@angular/core/testing';

import { SharedAlbumService } from './shared-album.service';

describe('SharedAlbumService', () => {
  let service: SharedAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedAlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
