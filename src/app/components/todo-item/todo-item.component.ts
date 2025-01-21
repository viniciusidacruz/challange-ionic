import {
  Input,
  OnInit,
  Inject,
  Output,
  Component,
  LOCALE_ID,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { CheckboxChangeEventDetail, IonicModule } from '@ionic/angular';

import { Todo } from 'src/@types';
import { TodoService } from 'src/app/services/todo.service';

interface CheckboxCustomEvent<T = any> extends CustomEvent {
  detail: CheckboxChangeEventDetail<T>;
  target: HTMLIonCheckboxElement;
}

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
})
export class TodoItemComponent implements OnInit {
  finishedAt: string | null = null;
  @Input() todo!: Todo;
  @Output() deleteTodo = new EventEmitter<string>();
  @Output() fetchAllTodos = new EventEmitter();
  @Output() onSelectTodo = new EventEmitter();

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private todoService: TodoService
  ) {}

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

  onEdit() {
    this.onSelectTodo.emit(this.todo);
  }

  onUpdateComplete(event: CheckboxCustomEvent) {
    this.todo.completed = !this.todo.completed;
    this.todoService.update({ ...this.todo }).subscribe({
      next: () => this.fetchAllTodos.emit(),
      error: (err) =>
        console.error('Erro ao atualizar o todo:', err.error.message),
    });
  }
}
