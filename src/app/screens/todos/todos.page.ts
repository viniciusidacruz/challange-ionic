import { Component, OnInit, ViewChild } from '@angular/core';

import { Todo } from 'src/@types';

import { TodoService } from '../../services/todo.service';
import { ModalAddTodoComponent } from 'src/app/components/modal-add-todo/modal-add-todo.component';

@Component({
  selector: 'app-home',
  templateUrl: 'todos.page.html',
  styleUrls: [],
  standalone: false,
})
export class TodosPage implements OnInit {
  todos: Todo[] = [];
  query: string = '';
  isLoading: boolean = true;
  error: String | null = null;
  todoSelected: Todo | null = null;

  @ViewChild(ModalAddTodoComponent) modalAddTodo:
    | ModalAddTodoComponent
    | undefined;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchAllTodos();
  }

  fetchAllTodos(query?: string) {
    this.isLoading = true;
    this.todoService.findMany(query).subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (err) => {
        console.error('Erro ao buscar os todos:', err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  trackByTodoId(index: number, todo: Todo): string {
    return todo.id;
  }

  onChangeInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;

    this.query = target.value || '';
    this.fetchAllTodos(this.query);
  }

  onDeleteTodo(todoId: string) {
    this.todoService.delete(todoId).subscribe({
      next: () => this.fetchAllTodos(),
      error: (err) => {
        console.log('Err: ', err);
      },
    });
  }

  onSelectTodo(todo: Todo) {
    this.todoSelected = todo;
    console.log({
      param: todo,
      selected: this.todoSelected,
    });
    this.modalAddTodo?.open();
  }
}
