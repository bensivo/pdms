import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.page';
import { ConfigPageComponent } from './pages/config/config.page';
import { EntityDetailPageComponent } from './pages/entity-detail/entity-detail.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'config', component: ConfigPageComponent },
  { path: 'config/entity/:key', component: EntityDetailPageComponent }
];
