import { Component, OnInit } from '@angular/core';

import { Todo } from 'src/@types';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'todos.page.html',
  styleUrls: [],
  standalone: false,
})
export class TodosPage implements OnInit {
  todos: Todo[] = [];
  error: String | null = null;
  isLoading: boolean = true;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchAllTodos();
  }

  fetchAllTodos() {
    this.isLoading = true;
    this.todoService.findMany().subscribe({
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
    const query = target.value?.toLowerCase() || '';
    this.todos = this.todos.filter((t) => t.title.includes(query));
  }

  onDeleteTodo(todoId: string) {
    this.todoService.delete(todoId).subscribe({
      next: () => this.fetchAllTodos(),
      error: (err) => {
        console.log('Err: ', err);
      },
    });
  }
}
