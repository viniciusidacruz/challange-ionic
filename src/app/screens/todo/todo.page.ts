import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';

import { Todo } from 'src/@types';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: [],
  standalone: false,
})
export class TodoPage implements OnInit {
  todoId: string | null = null;
  todo: Todo | null = null;
  finishedAt: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];

    if (this.todoId) {
      this.todoService.findById(this.todoId).subscribe((todo) => {
        this.todo = todo;
        this.finishedAt = formatDate(
          todo.finishedAt,
          'dd/MM/yyyy',
          this.locale
        );
      });
    }
  }
}
