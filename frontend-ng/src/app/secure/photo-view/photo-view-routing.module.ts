import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoViewPage } from './photo-view.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoViewPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoViewPageRoutingModule {}
