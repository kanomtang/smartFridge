import { Component, OnInit } from '@angular/core';
import {AuthService} from '../providers/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  ngOnInit(): void {
  }
  constructor(private authService: AuthService,
              private router: Router) {
  }
  isPasswordMatch() {
      return this.password === this.confirmPassword;
    }

    signUp() {
      this.authService.signup(this.email, this.password);
      this.router.navigate(['login']);
        // .subscribe(
        //   () => {
        //     alert('User created successfully !');
        //     this.router.navigateByUrl('/home');
        //   },
        //   err => alert(err)
        // );
    }



}
