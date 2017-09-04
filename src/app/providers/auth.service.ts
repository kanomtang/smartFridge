import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import {FirebaseApp} from 'angularfire2';


@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  constructor(public db: AngularFireDatabase,
              private firebaseAuth: AngularFireAuth,
              private router: Router ,
              private firebase: FirebaseApp) {
    this.user = firebaseAuth.authState;
    this.items = db.list('items');

  }


  signup(email: string, password: string): boolean {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        console.log('user:', this.user);
        alert('Registration is successful');
        this.logout();
        this.router.navigate(['login']);
        return true;
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        if (err.message) {
          alert(err.message);
        }
        return false;
      });
    return false;
  }


  login(email: string, password: string): boolean {
    if (email && password) {
      this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(value => {
          console.log('Nice, it worked!');
          console.log(this.user);
          this.router.navigate(['home']);
          return true;
        })
        .catch(err => {
          console.log('Something went wrong:', err.message);
          if (err.message) {
            alert('email or password is invalid');
          }
          return false;
        });
    }else {
      alert('Email or Password is missing.');
      return false;
    }
  }

  logout(): boolean {
    this.firebaseAuth
      .auth
      .signOut();
    return true;
  }

}
