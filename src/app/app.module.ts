import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { AuthService } from './providers/auth.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuardService } from './providers/auth-guard.service';


export const firebaseConfig = {
    apiKey: 'AIzaSyBw7XI7wxhmhIIZDdeeSlQCNSpp1RqGhPg',
    authDomain: 'smartfridge-40cfd.firebaseapp.com',
    databaseURL: 'https://smartfridge-40cfd.firebaseio.com',
    projectId: 'smartfridge-40cfd',
    storageBucket: 'smartfridge-40cfd.appspot.com',
    messagingSenderId: '1051575034709'
};

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuardService] }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
