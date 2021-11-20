import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './secure/components/header/header.component';
import { HometabsComponent } from './secure/components/home-tabs/hometabs.component';
import { AlbumsComponent } from './secure/components/home-tabs/albums/albums.component';
import { PhotosComponent } from './secure/components/home-tabs/photos/photos.component';
import { SharedComponent } from './secure/components/home-tabs/shared/shared.component';
import { CreateNewAlbumComponent } from './secure/modals/create-new-album/create-new-album.component';
import { ViewPopoverComponent } from './secure/modals/view-popover/view-popover.component';
import { SortPopoverComponent } from './secure/modals/sort-popover/sort-popover.component';
import { UploadPhotoComponent } from './secure/modals/upload-photo/upload-photo.component';
import { AddToAlbumComponent } from './secure/modals/add-to-album/add-to-album.component';
import {UploadComponent} from './secure/components/upload/upload.component';
import { EditAlbumPopoverComponent } from './secure/modals/edit-album-popover/edit-album-popover.component';
import { RenameAlbumComponent } from './secure/modals/rename-album/rename-album.component';
import { CredentialsInterceptor } from './interceptors/credentials.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
        UploadComponent,
        AddToAlbumComponent,
        EditAlbumPopoverComponent,
        RenameAlbumComponent

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
        EditAlbumPopoverComponent,
        RenameAlbumComponent
    ],
    entryComponents: [
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true}]
})

export class ComponentsModule {
}
