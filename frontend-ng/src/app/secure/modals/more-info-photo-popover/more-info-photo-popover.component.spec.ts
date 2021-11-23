import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreInfoPhotoPopoverComponent } from './more-info-photo-popover.component';

describe('MoreInfoPhotoPopoverComponent', () => {
  let component: MoreInfoPhotoPopoverComponent;
  let fixture: ComponentFixture<MoreInfoPhotoPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreInfoPhotoPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreInfoPhotoPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
