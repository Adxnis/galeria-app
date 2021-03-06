import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from 'src/app/components';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TabsPageRoutingModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
