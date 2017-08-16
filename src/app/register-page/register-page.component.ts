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
    isPasswordMatch(): boolean {
      return this.password === this.confirmPassword;
    }
    isEmpty(): boolean {
      if (this.email && this.password && this.confirmPassword) {
        return true;
      }else {
        return false;
      }
    }

    signUp() {
      if (this.isPasswordMatch()) {
        this.authService.signup(this.email, this.password);
      }else {
        alert('password is not matched');
      }
    }



}
