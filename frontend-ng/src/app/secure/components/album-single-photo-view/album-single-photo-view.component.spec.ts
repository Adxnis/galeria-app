import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlbumSinglePhotoViewComponent } from './album-single-photo-view.component';

describe('AlbumSinglePhotoViewComponent', () => {
  let component: AlbumSinglePhotoViewComponent;
  let fixture: ComponentFixture<AlbumSinglePhotoViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumSinglePhotoViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumSinglePhotoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
