import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { ModalErrorComponent } from '../../../shared/components/modal-error/modal-error.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LoaderComponent,
    ModalErrorComponent,
  ],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loading = signal<boolean>(false);
  isError = signal<boolean>(false);

  form = this.fb.group({
    username: ['', Validators.required],
    cedula: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required, Validators.minLength(6)]],
  });

  async submit() {
    if (this.form.invalid) return;
    try {
      this.loading.set(true);
      this.authService
        .register(
          this.form.value.email!,
          this.form.value.username!,
          this.form.value.cedula!,
          this.form.value.pass!
        )
        .subscribe((uid) => {
          localStorage.setItem('uid', uid);
          this.router.navigate(['/']);
        });

      this.form.markAllAsTouched();
    } finally {
      this.loading.set(false);
    }
  }

  get username() {
    return this.form.get('username');
  }

  get cedula() {
    return this.form.get('cedula');
  }

  get email() {
    return this.form.get('email');
  }

  get pass() {
    return this.form.get('pass');
  }
}
