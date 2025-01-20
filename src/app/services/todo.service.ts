import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Todo } from 'src/@types';

import { CreateInput, UpdateInput } from './todo.service.d';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  /**
   * Method findMany.
   *
   * @example
   * <CustomButton variant='danger'>Danger</CustomButton>
   */
  findMany(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  findById(id: string): Observable<Todo> {
    return this.http.get<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }

  create(todo: CreateInput) {
    return this.http.post('https://jsonplaceholder.typicode.com/todos', todo);
  }

  update(todo: UpdateInput) {
    return this.http.put(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      todo
    );
  }

  delete(id: number) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
}
