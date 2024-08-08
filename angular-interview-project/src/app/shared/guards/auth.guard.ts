import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (activatedRouteSnapshot, routerStateSnapshot) => {
  return true;
};
