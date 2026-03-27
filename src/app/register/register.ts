import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {

constructor(
  private auth: Auth,
  private router: Router
  
) {}
username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

onRegister() {
  if (this.password !== this.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const data = {
    username: this.username,
    email: this.email,
    password: this.password
  };

  this.auth.register(data).subscribe({
    next: () => {
      alert('Registration Successful');
      this.router.navigate(['/']);
    },
    error: () => {
      alert('Error in registration');
    }
  });
}
}
