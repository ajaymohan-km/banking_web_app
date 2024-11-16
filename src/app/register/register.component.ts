import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor( private formBuilder: FormBuilder,private authService: AuthService,private router: Router){
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      role: ['CUSTOMER', Validators.required]
    });
}
onSubmit(): void {
  if (this.registerForm.invalid) {
    return;
  }

  this.loading = true;
  const registrationData = this.registerForm.value;
  console.log('Sending registration data:', registrationData);

  this.authService.register(registrationData).subscribe({
    next: (response) => {
      console.log('Registration successful:', response);
      this.router.navigate(['/login'], { queryParams: { registered: true }});
    },
    error: error => {
      console.error('Registration error:', error);
      this.error = error.error?.message || 'Registration failed';
      this.loading = false;
    }
  });
}
}
