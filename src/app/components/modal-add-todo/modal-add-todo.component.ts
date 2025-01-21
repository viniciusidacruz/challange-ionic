import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'modal-add-todo',
  templateUrl: './modal-add-todo.component.html',
  styleUrls: [],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ModalAddTodoComponent {
  @ViewChild(IonModal) modal!: IonModal;

  constructor() {}

  ngOnInit() {}

  close() {
    this.modal.dismiss(null, 'cancel');
  }
}
