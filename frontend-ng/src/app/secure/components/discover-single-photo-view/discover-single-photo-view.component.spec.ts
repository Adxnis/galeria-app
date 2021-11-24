import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiscoverSinglePhotoViewComponent } from './discover-single-photo-view.component';

describe('DiscoverSinglePhotoViewComponent', () => {
  let component: DiscoverSinglePhotoViewComponent;
  let fixture: ComponentFixture<DiscoverSinglePhotoViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverSinglePhotoViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiscoverSinglePhotoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
