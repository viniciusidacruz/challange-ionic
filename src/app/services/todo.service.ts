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
   * Método buscar todos os todos.
   *
   * @param {string} q - query string para buscar através do título do todo.
   * @param {number} page - Número da página atual.
   *
   */
  findMany(q?: string, page: number = 1): Observable<Todo[]> {
    const urlParams = new URLSearchParams({
      page: page.toString(),
    });

    if (q) {
      urlParams.set('q', q);
    }

    return this.http.get<Todo[]>(
      `${this.baseUrl}/todos?${urlParams.toString()}`
    );
  }

  /**
   * Método para exibir detalhes de um todo especifico.
   *
   * @param {string} id - ID do todo para buscar os detalhes.
   *
   */
  findById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.baseUrl}/todo/${id}/details`);
  }

  /**
   * Método para cadastrar um novo todo.
   *
   * @param {CreateInput} todo - Objeto com os dados do todo a ser cadastrado.
   *
   * */
  create(todo: CreateInput) {
    return this.http.post(`${this.baseUrl}/todos/create`, todo);
  }

  /**
   * Método para atualizar um todo.
   *
   * @param {UpdateInput} todo - Objeto com os dados do todo a ser editado com id.
   *
   * */
  update({ id, ...todo }: UpdateInput) {
    return this.http.put(`${this.baseUrl}/todo/${id}/update`, { ...todo });
  }

  /**
   * Método para deletar um todo.
   *
   * @param {string} id - ID do todo a ser deletado.
   **/
  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/todo/${id}/delete`);
  }
}
