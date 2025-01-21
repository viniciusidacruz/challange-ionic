import {
  Input,
  Output,
  Component,
  ViewChild,
  OnChanges,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Todo } from 'src/@types';
import { TodoService } from 'src/app/services/todo.service';

import { buildPayload } from './modal-add-todo.component-factories';

@Component({
  selector: 'modal-add-todo',
  templateUrl: './modal-add-todo.component.html',
  styleUrls: [],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
})
export class ModalAddTodoComponent implements OnChanges {
  isSubmitting: boolean = false;
  errorMessage: string | null = null;

  @ViewChild(IonModal, { static: false }) modal!: IonModal;
  @Output() fetchAllTodos = new EventEmitter();
  @Input() todoSelected: Todo | null = null;

  payload = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    completed: new FormControl(false),
    finishedAt: new FormControl('', Validators.required),
  });

  constructor(private todoService: TodoService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['todoSelected'] && changes['todoSelected'].currentValue) {
      const todo = changes['todoSelected'].currentValue as Todo;

      const formattedFinishedAt = todo.finishedAt
        ? new Date(todo.finishedAt).toISOString().slice(0, 16)
        : '';

      this.payload.patchValue({
        title: todo.title || '',
        description: todo.description || '',
        completed: todo.completed || false,
        finishedAt: formattedFinishedAt,
      });
    }
  }

  onSave() {
    if (this.payload.valid) {
      this.isSubmitting = true;

      const todoData = buildPayload(this.payload);

      const request$ = this.todoSelected
        ? this.todoService.update({ id: this.todoSelected.id, ...todoData })
        : this.todoService.create(todoData);

      request$.subscribe({
        next: () => this.onSuccess(),
        error: (err) => this.onError(err),
        complete: () => (this.isSubmitting = false),
      });
    } else {
      this.markAllAsTouched();
    }
  }

  onSuccess() {
    this.resetForm();
    this.modal.dismiss(null, 'created');
    this.errorMessage = null;
    this.fetchAllTodos.emit();
  }

  onError(err: any) {
    this.errorMessage = err.error?.message || 'Ocorreu um erro inesperado.';
  }

  markAllAsTouched() {
    Object.values(this.payload.controls).forEach((control) =>
      control.markAsTouched()
    );
  }

  resetForm() {
    this.payload.reset({
      title: '',
      description: '',
      completed: false,
      finishedAt: '',
    });
  }

  close() {
    this.modal.dismiss(null, 'cancel');
  }

  open() {
    this.modal.present();
  }
}
