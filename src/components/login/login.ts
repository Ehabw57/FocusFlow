import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Userapi } from '../../services/userapi';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form: FormGroup;
  isError: { message: string } | null = null;
  constructor(private fb: FormBuilder, private userApi: Userapi, private router: Router) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    this.userApi.authenticateUser(email, password).subscribe((user) => {
      if (user) {
        this.router.navigate(['/']);
        return;
      }
      this.isError = { message: 'Invalid email or password' };
    });
  }
}
