import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  // Check Authentication State
  checkAuthState(): Observable<User | null> {
    return authState(this.auth);
  }

  // Sign in a user with email and password
  async login(email: string, password: string): Promise<User | null> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }

  // Register a new user with email and password
  /*async register(email: string, password: string, additionalData: any = {}): Promise<User | null> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    await this.createUserProfile(user.uid, additionalData);
    return user;
  }*/


  // Log out the user
  logout(): Promise<void> {
    return signOut(this.auth);
  }

  // Create or update a user profile in Firestore
  private async createUserProfile(uid: string, data: any): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    await setDoc(userDocRef, data, { merge: true });
  }

  // Get a user profile from Firestore
  async getUserProfile(uid: string): Promise<any> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const docSnapshot = await getDoc(userDocRef);
    return docSnapshot.exists() ? docSnapshot.data() : null;
  }
}
