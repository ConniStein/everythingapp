import {Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips'

import { FirebaseService } from '../../services/firebase.service';

import { AuthService } from 'src/app/services/auth.service';

import { HttpClient, provideHttpClient } from '@angular/common/http';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatChipsModule,
  ],
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent{

  constructor(private router: Router, private firebaseService: FirebaseService, private authService: AuthService){}
  /*fb = inject(FormBuilder);
  authService = inject(AuthService)
  http= inject(HttpClient)
  
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit():void{
    const rawForm = this.form.getRawValue()
    this.authService
    .register( rawForm.username,rawForm.email, rawForm.password)
    .subscribe(() => {
      console.log('hello')
      this.router.navigateByUrl('/home');
    });
  }*/

    email:any = '';
    password:any = '';
    username:any ='';

    errorMessage: string | null = null;

  async register(email: string, password: string) {
    try {
      const user = await this.authService.register(email, password, this.username)
      .subscribe({
        next:() =>{
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.errorMessage = err.code;
      }
      });
      console.log('Registered:', user);
      
    } catch (error) {
      console.error('Registration error:', error);
    }
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
}
