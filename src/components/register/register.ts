import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Userapi } from '../../services/userapi';

const passwordMatchValidator = (form: AbstractControl) => {
  const pass = form.get('password')?.value;
  const confirm = form.get('confirmPassword')?.value;
  return pass === confirm ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  inputs = [
    { name: 'Name', type: 'text', id: 'name' },
    { name: 'Email', type: 'email', id: 'email' },
    { name: 'Password', type: 'password', id: 'password' },
    { name: 'Confirm Password', type: 'password', id: 'confirmPassword' },
  ];
  form!: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private userapi: Userapi) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: [''],
      },
      { validators: passwordMatchValidator }
    );
  }

  isError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control?.touched && control?.errors ? true : false;
  }

  getError(controlName: string): string | null {
    const control = this.form.get(controlName);
    if (!control?.touched) return '';
    if (control?.hasError('required')) return `${controlName} field is required`;
    if (control?.hasError('email')) return 'Enter a valid email';
    if (control?.hasError('minlength'))
      return `${controlName} minimum ${control.errors?.['minlength'].requiredLength} characters`;
    if (this.form.hasError('passwordMismatch') && controlName === 'confirmPassword')
      return 'Passwords do not match';
    return '';
  }

  onSubmit() {
    const user = { ...this.form.value, confirmPassword: undefined };
    this.userapi.registerUser(user).subscribe((success) => {
      if (success) {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      } else {
        alert('Registration failed. Please try again.');
      }
    });
  }
}
