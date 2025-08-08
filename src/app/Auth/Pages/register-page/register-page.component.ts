import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true, // si estás usando Angular standalone
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  form: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async submit() {
    if (this.form.valid) {
      console.log('🚀 Registro enviado:', this.form.value);
      const rawForm = this.form.getRawValue();

      this.authService
        .register(rawForm.email, rawForm.username, rawForm.cedula, rawForm.pass)
        .subscribe((uid) => {
          // 👈 aquí recibes el uid
          console.log('✅ Usuario creado con UID:', uid);
          localStorage.setItem('uid', uid);
          this.router.navigate(['/']);
        });
    } else {
      this.form.markAllAsTouched();
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
