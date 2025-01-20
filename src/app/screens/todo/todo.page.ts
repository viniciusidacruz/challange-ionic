import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/@types';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: [],
})
export class TodoPage implements OnInit {
  todoId: string | null = null;
  todo: Todo | null = null;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];

    if (this.todoId) {
      this.todoService
        .findById(this.todoId)
        .subscribe((todo) => (this.todo = todo));
    }
  }
}
