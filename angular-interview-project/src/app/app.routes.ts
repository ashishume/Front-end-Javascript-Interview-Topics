import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RxjsOperatorsComponent } from './pages/rxjs-operators/rxjs-operators.component';
import { ParentComponent } from './pages/two-way-binding/parent/parent.component';
import { VirtualScrollComponent } from './pages/virtual-scroll/virtual-scroll.component';
import { NgZoneComponent } from './pages/ng-zone/ng-zone.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: RxjsOperatorsComponent,
  },
  {
    path: 'virtual-scroll',
    component: VirtualScrollComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ng-zone',
    component: NgZoneComponent,
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
    //lazy loading
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.routes').then((m) => m.userRoutes), // m.userModule for non-standalone 
  },
];
