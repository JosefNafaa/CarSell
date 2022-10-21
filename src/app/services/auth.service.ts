import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private auth: AngularFireAuth
  ) {
    this.auth.onAuthStateChanged(user => {
      this.currentUserSubject.next(user);
    }, console.error);
  }

  //create a new user
  signupUser(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        resolve(user);
      }).catch(reject);
    });
  }
  //Sign in
  signinUser(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password).then(resolve).catch(reject);
    });
  }

  //Deconnexion
  signoutUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.signOut().then(() => {
        this.currentUserSubject.next(null);
        resolve();
      }).catch(reject);
    });
  }
  //recuperer password

  sendPasswordResetEmail(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.sendPasswordResetEmail(email).then(resolve).catch(reject);
    });
  }

}
