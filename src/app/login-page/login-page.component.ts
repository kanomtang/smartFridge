import {Component, NgModule, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from '../providers/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
@NgModule({
  imports: [ FormsModule ],
  providers: [ AuthService ]
})
export class LoginPageComponent implements OnInit {
  email: string;
  password: string;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log('email' + this.email);
  }
  login() {
    this.authService.login(this.email, this.password);
  }
}
