import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumPhotoViewPage } from './album-photo-view.page';
import { AlbumSinglePhotoViewComponent } from '../components/album-single-photo-view/album-single-photo-view.component';

const routes: Routes = [
  {
    path: '',
    component: AlbumPhotoViewPage
  },
  // {
  //   path: 'album:id1/photo/:id2',
  //   component: AlbumSinglePhotoViewComponent
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumPhotoViewPageRoutingModule {}
