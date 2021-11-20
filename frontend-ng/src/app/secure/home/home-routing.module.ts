import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SinglePhotoViewComponent } from '../components/single-photo-view/single-photo-view.component';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'photos/:id', 
    component: SinglePhotoViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
