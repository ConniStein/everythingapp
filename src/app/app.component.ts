
import {Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'everythingapp';

  constructor(public authService: AuthService, public router: Router){}

  ngOnInit(): void {
    this.authService.user$.subscribe( user =>{
      if(user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  }

  logout():void{
    this.authService.logout();

  }
}
