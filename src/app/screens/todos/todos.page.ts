import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/@types';

@Component({
  selector: 'app-home',
  templateUrl: 'todos.page.html',
  styleUrls: [],
  standalone: false,
})
export class TodosPage implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.findMany().subscribe((todos) => (this.todos = todos));
  }
}
