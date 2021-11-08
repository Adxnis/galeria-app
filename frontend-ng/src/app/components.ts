import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { HometabsComponent } from './components/home-tabs/hometabs.component';
import { AlbumsComponent } from './components/home-tabs/albums/albums.component';
import { PhotosComponent } from './components/home-tabs/photos/photos.component';
import { SharedComponent } from './components/home-tabs/shared/shared.component';
import { CreateNewAlbumComponent } from './modals/create-new-album/create-new-album.component';
import { ViewPopoverComponent } from './modals/view-popover/view-popover.component';
import { SortPopoverComponent } from './modals/sort-popover/sort-popover.component';
import { UploadPhotoComponent } from './modals/upload-photo/upload-photo.component';
import { AddToAlbumComponent } from './modals/add-to-album/add-to-album.component';
// define all components here so we can use them in lazy loaded pages.
@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        HeaderComponent,
        HometabsComponent,
        AlbumsComponent,
        PhotosComponent,
        SharedComponent,
        CreateNewAlbumComponent,
        ViewPopoverComponent,
        SortPopoverComponent,
        UploadPhotoComponent,
        AddToAlbumComponent

    ],
    exports: [
        HeaderComponent,
        HometabsComponent,
        AlbumsComponent,
        PhotosComponent,
        SharedComponent,
        CreateNewAlbumComponent,
        ViewPopoverComponent,
        SortPopoverComponent,
        UploadPhotoComponent,
        AddToAlbumComponent,
    ],
    entryComponents: [
    ]
})

export class ComponentsModule {
}
