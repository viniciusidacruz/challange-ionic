import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Todo } from 'src/@types';

import { CreateInput, UpdateInput } from './todo.service.d';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl = 'https://challenge-ionic-api.onrender.com';
  constructor(private http: HttpClient) {}

  /**
   * Method findMany.
   *
   * @example
   * <CustomButton variant='danger'>Danger</CustomButton>
   */
  findMany(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`);
  }

  findById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.baseUrl}/todo/${id}/details`);
  }

  create(todo: CreateInput) {
    return this.http.post(`${this.baseUrl}/todos/create`, todo);
  }

  update({ id, ...todo }: UpdateInput) {
    return this.http.put(`${this.baseUrl}/todo/${id}/update`, { ...todo });
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/todo/${id}/delete`);
  }
}
