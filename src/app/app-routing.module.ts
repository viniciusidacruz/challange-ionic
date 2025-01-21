import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'todos',
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
    loadChildren: () =>
      import('./screens/todo/todo.module').then((m) => m.TodoPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
