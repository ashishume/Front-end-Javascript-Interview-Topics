import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RxjsOperatorsComponent } from './pages/rxjs-operators/rxjs-operators.component';

export const routes: Routes = [
  {
    path: '',
    component: RxjsOperatorsComponent,
  },
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
