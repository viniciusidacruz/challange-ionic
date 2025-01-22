import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'todos',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./screens/todos/todos.module').then((m) => m.TodosPageModule),
  },
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    path: 'todo/:id/details',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./screens/todo/todo.module').then((m) => m.TodoPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./screens/login/login.module').then((m) => m.LoginPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
