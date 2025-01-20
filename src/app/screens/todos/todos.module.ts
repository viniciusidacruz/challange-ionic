import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TodosPage } from './todos.page';

import { TodosPageRoutingModule } from './todos-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TodosPageRoutingModule],
  declarations: [TodosPage],
})
export class TodosPageModule {}
