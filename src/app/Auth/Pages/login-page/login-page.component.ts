import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { ModalErrorComponent } from '../../../shared/components/modal-error/modal-error.component';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    LoaderComponent,
    ModalErrorComponent,
  ],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  loading = signal<boolean>(false);
  isError = signal<boolean>(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    try {
      if (this.form.invalid) return;

      this.loading.set(true);

      this.authService
        .login(this.form.value.email!, this.form.value.pass!)
        .subscribe({
          next: (uid: string) => {
            localStorage.setItem('uid', uid);
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.log(err?.code || err?.message || err);
            this.loading.set(false);
            this.isError.set(true);
          },
        });

      this.form.markAllAsTouched();
    } finally {
      this.loading.set(false);
    }
  }

  get email() {
    return this.form.get('email');
  }

  get pass() {
    return this.form.get('pass');
  }

  onCloseModal(next: boolean) {
    this.isError.set(false);
  }
}
