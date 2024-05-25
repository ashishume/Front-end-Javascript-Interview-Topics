import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RxjsOperatorsComponent } from './pages/rxjs-operators/rxjs-operators.component';
import { ParentComponent } from './pages/two-way-binding/parent/parent.component';
import { VirtualScrollComponent } from './pages/virtual-scroll/virtual-scroll.component';

export const routes: Routes = [
  {
    path: '',
    component: RxjsOperatorsComponent,
  },
  {
    path: 'virtual-scroll',
    component: VirtualScrollComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'parent',
    component: ParentComponent,
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.routes').then((m) => m.userRoutes),
  },
];
