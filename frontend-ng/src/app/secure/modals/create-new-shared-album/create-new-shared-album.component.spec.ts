import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateNewSharedAlbumComponent } from './create-new-shared-album.component';

describe('CreateNewSharedAlbumComponent', () => {
  let component: CreateNewSharedAlbumComponent;
  let fixture: ComponentFixture<CreateNewSharedAlbumComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewSharedAlbumComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNewSharedAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
