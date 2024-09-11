import { Injectable, inject, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword , user} from "@angular/fire/auth";
import { signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { Observable, from } from "rxjs";
import { Router } from '@angular/router';
import { ReturnStatement } from "@angular/compiler";
import { UserInterface } from "../interfaces/user.interface";
import { FirebaseService } from "./firebase.service";

@Injectable({
    providedIn: 'root',
})


export class AuthService {
    constructor(private router: Router, private firebaseService: FirebaseService){}

    firebaseAuth = inject(Auth);
    user$ = user(this.firebaseAuth)
    currentUserSig = signal<UserInterface | null | undefined>(undefined)

    register(
        email: string,
        username: string,
        password: string,
      ): Observable<void>{
        const promise = createUserWithEmailAndPassword(
          this.firebaseAuth,
          email,
          password,
        ).then(response => 
            updateProfile(response.user, {displayName: username}),
        );

        return from(promise);
      }
      
    login(email: string, password: string): Observable<void>{
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password,
        ).then(() => {});
        return from(promise);
    }

    /*async logout() {
        await this.firebaseService.logout();
        console.log('Logged out');
      }*/

    logout():Observable<void>{
        const promise = signOut(this.firebaseAuth);
        return from(promise);
    }

}