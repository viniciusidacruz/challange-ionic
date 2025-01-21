import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { TodoPage } from './todo.page';
import { TodoPageRoutingModule } from './todo-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TodoPageRoutingModule],
  declarations: [TodoPage],
})
export class TodoPageModule {}
