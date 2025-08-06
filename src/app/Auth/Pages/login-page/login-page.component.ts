import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true, // si estás usando Angular 14+ con standalone components
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.form.valid) {
      const { email, pass } = this.form.value;
      console.log('📨Enviando datos:', { email, pass });
      // Aquí puedes llamar a un servicio de autenticación
    } else {
      this.form.markAllAsTouched(); // Muestra errores si el usuario no tocó los campos
    }
  }

  get email() {
    return this.form.get('email');
  }

  get pass() {
    return this.form.get('pass');
  }
}
