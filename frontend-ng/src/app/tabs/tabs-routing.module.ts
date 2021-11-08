import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../secure/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'discover',
        loadChildren: () => import('../secure/discover/discover.module').then( m => m.DiscoverPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../secure/home/home.module').then( m => m.HomePageModule)
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
