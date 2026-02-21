import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.page';
import { WorkspaceConfigPageComponent } from './pages/workspace-config/workspace-config.page';
import { EntityConfigPageComponent } from './pages/entity-config/entity-config.page';
import { EntityListPageComponent } from './pages/entity-list/entity-list.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'workspace-config', component: WorkspaceConfigPageComponent },
  { path: 'workspace-config/entity/:key', component: EntityConfigPageComponent },
  { path: 'entity/:key', component: EntityListPageComponent }
];
