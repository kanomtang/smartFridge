import { Component, OnInit } from '@angular/core';
import {AuthService} from '../providers/auth.service';
import {Router} from '@angular/router'; ( AuthService)

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  title = 'WELCOME TO ISR ';
  constructor(private  authService: AuthService, private router: Router) { }
  ngOnInit() {
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
