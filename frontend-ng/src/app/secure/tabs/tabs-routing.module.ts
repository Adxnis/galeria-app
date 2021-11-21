import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinglePhotoViewComponent } from '../components/single-photo-view/single-photo-view.component';
import { PhotoViewPage } from '../photo-view/photo-view.page';
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
        path: 'photos',
        component: SinglePhotoViewComponent
      },
      {
        path: 'photos/:id',
        component: SinglePhotoViewComponent
      },
      // {
      //   path: 'home/:id',
      //   loadChildren: () => import('../photo-view/photo-view.module').then( m => m.PhotoViewPageModule)
      // },
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
