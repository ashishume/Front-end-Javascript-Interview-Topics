import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.routes').then((m) => m.userRoutes),
  },
];
