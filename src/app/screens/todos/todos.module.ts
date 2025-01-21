import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TodoItemComponent } from 'src/app/components/todo-item/todo-item.component';

import { TodosPage } from './todos.page';
import { TodosPageRoutingModule } from './todos-routing.module';
import { ModalAddTodoComponent } from 'src/app/components/modal-add-todo/modal-add-todo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodosPageRoutingModule,
    TodoItemComponent,
    ModalAddTodoComponent,
  ],
  declarations: [TodosPage],
})
export class TodosPageModule {}
