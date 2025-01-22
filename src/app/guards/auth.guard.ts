import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export const authGuard: CanActivateFn = async (route, state) => {
  const storage: Storage = inject(Storage);
  const router: Router = inject(Router);

  const userId = await storage.get('userId');

  const protectedRoutes: string[] = ['/todos', '/todo'];

  return protectedRoutes.includes(state.url) && !userId
    ? router.navigate(['/login'])
    : true;
};
