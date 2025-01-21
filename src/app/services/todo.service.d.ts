export interface CreateInput {
  completed: boolean;
  description: string;
  finishedAt: string;
  title: string;
}

export type UpdateInput = CreateInput & {
  id: string;
};
