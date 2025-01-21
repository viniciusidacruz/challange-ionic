import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { Todo } from 'src/@types';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: [],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;

  constructor() {}

  ngOnInit() {}
}
