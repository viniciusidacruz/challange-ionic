import {
  Component,
  Input,
  OnInit,
  LOCALE_ID,
  Inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
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
  finishedAt: string | null = null;
  @Input() todo!: Todo;
  @Output() deleteTodo = new EventEmitter<string>();

  constructor(@Inject(LOCALE_ID) public locale: string) {}

  ngOnInit() {
    this.finishedAt = formatDate(
      this.todo.finishedAt,
      'dd/MM/yyyy',
      this.locale
    );
  }

  onDelete() {
    this.deleteTodo.emit(this.todo.id);
  }
}
