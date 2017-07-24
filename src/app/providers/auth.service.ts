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
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }


  login(email: string, password: string) {
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
      });
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     const errorCode = error.status;
    //     const errorMessage = error.message;
    //     if (errorCode === 'auth/wrong-password') {
    //       alert('Wrong password.');
    //     } else {
    //       alert(errorMessage);
    //     }
    //     console.log(error);
    //   });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}
