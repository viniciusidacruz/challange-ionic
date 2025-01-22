import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [],
  standalone: false,
})
export class LoginPage {
  isSubmitting: boolean = false;

  errorMessage: string | null = null;

  payload = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private storage: Storage,
    private router: Router
  ) {}

  onSave() {
    if (this.payload.valid) {
      this.isSubmitting = true;

      this.authenticationService
        .auth({
          email: this.payload.value.email!,
          password: this.payload.value.password!,
        })
        .subscribe({
          next: (user) => this.onSuccess(user),
          error: (err) => this.onError(err),
          complete: () => (this.isSubmitting = false),
        });
    } else {
      this.markAllAsTouched();
    }
  }

  markAllAsTouched() {
    Object.values(this.payload.controls).forEach((control) =>
      control.markAsTouched()
    );
  }

  async onSuccess(user: { id: string }) {
    await this.storage.set('userId', user.id);
    this.resetForm();
    this.errorMessage = null;
    this.router.navigate(['/todos']);
  }

  onError(err: any) {
    this.errorMessage = err.error?.message || 'Ocorreu um erro inesperado.';
  }

  resetForm() {
    this.payload.reset({
      email: '',
      password: '',
    });
  }
}
