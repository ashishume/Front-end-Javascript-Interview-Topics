import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path:"",
        redirectTo:"",
        pathMatch:"full"
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
  },
];
