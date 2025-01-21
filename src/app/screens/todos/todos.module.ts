import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TodoItemComponent } from 'src/app/components/todo-item/todo-item.component';

import { TodosPage } from './todos.page';
import { TodosPageRoutingModule } from './todos-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TodosPageRoutingModule, TodoItemComponent],
  declarations: [TodosPage],
})
export class TodosPageModule {}
