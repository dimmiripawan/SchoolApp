import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
username: string = '';
  password: string = '';


constructor(
  private auth: Auth,
  private router: Router
) {}
onLogin() {

  // ✅ Step 1: Basic validation
  if (!this.username || !this.password) {
    alert('Please enter username and password');
    return;
  }

  const data = {
    username: this.username.trim(),
    password: this.password.trim()
  };

  console.log("Sending data:", data); // debug

  // ✅ Step 2: Call backend
  this.auth.login(data).subscribe({
    next: (res: any) => {
      console.log("Response:", res);

      // ✅ Step 3: Check response
      if (res === 'SUCCESS' || res?.username) {
        alert('Login Success');
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid credentials');
      }
    },

    error: (err) => {
      console.error("Error:", err);
      alert('Invalid credentials');
    }
  });
}
  
}