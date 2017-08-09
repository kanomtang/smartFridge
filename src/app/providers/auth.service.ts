import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  constructor(public db: AngularFireDatabase,
              private firebaseAuth: AngularFireAuth,
              private router: Router ) {
    this.user = firebaseAuth.authState;
    this.items = db.list('items');
  }


  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        alert("Registration is successful");

        this.logout();
        this.router.navigate(['login']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        if (err.message) {
          alert(err.message);
        }
      });
  }


  login(email: string, password: string) {
    if (email && password) {
      this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(value => {
          console.log('Nice, it worked!');
          console.log(this.user);
          this.router.navigate(['home']);
        })
        .catch(err => {
          console.log('Something went wrong:', err.message);
          if (err.message) {
            alert("email or password is invalid");
          }
        });
    }else {
      alert('Email or Password is missing.');
    }
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}
