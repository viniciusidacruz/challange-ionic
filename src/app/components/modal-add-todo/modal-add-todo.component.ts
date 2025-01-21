import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/@types';

@Component({
  selector: 'modal-add-todo',
  templateUrl: './modal-add-todo.component.html',
  styleUrls: [],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
})
export class ModalAddTodoComponent implements OnChanges {
  isSubmitting: boolean = false;
  errorMessage: string | null = null;

  @ViewChild(IonModal) modal!: IonModal;
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
      const formattedFinishedAt = this.todoSelected?.finishedAt
        ? new Date(this.todoSelected.finishedAt).toISOString().slice(0, 16)
        : '';

      this.payload.patchValue({
        title: this.todoSelected?.title || '',
        description: this.todoSelected?.description || '',
        completed: this.todoSelected?.completed || false,
        finishedAt: formattedFinishedAt,
      });
    }
  }

  onSave() {
    if (this.payload.valid) {
      this.isSubmitting = true;

      const todoData = {
        title: this.payload.value.title!,
        description: this.payload.value.description || '',
        completed: this.payload.value.completed!,
        finishedAt: new Date(this.payload.value.finishedAt!).toISOString(),
      };

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
    this.errorMessage = err.error.message;
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
