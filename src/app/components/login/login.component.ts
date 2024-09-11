import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ]
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.firebaseService.checkAuthState().subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  loginUser() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: (err) => this.errorMessage = this.mapFirebaseError(err.code)
    });
  }

  mapFirebaseError(code: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
