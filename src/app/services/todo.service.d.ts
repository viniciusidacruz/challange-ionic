import { Todo } from 'src/@types';

export interface CreateInput {
  userId: number;
  title: string;
  completed: boolean;
}

export type UpdateInput = Todo;
