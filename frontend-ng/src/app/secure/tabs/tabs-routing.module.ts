import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumSinglePhotoViewComponent } from '../components/album-single-photo-view/album-single-photo-view.component';
import { DiscoverSinglePhotoViewComponent } from '../components/discover-single-photo-view/discover-single-photo-view.component';
import { SinglePhotoViewComponent } from '../components/single-photo-view/single-photo-view.component';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'discover',
        loadChildren: () => import('../discover/discover.module').then( m => m.DiscoverPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'photos/:id',
        component: SinglePhotoViewComponent
      },
      {
        path: 'album/:id',
        loadChildren: () => import('../album-photo-view/album-photo-view.module').then( m => m.AlbumPhotoViewPageModule)
      },
      {
        path: 'album/:id1/photo/:id2',
        component: AlbumSinglePhotoViewComponent
      },
      {
        path: 'discover/photos/:id',
        component: DiscoverSinglePhotoViewComponent
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
