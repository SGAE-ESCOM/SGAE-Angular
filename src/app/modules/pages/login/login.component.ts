import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MessagesService } from '@services/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  isError: boolean = false;
  fgUsuario: FormGroup;

  constructor(  
    public afAuth: AngularFireAuth, private router: Router, 
    private authService: AuthService, private fb: FormBuilder ) {
  }

  ngOnInit() {
    this.fgUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  getErrorMessage() {
    return this.fgUsuario.get('email').hasError('required') ? 'Debes ingresar un valor' :
      this.fgUsuario.get('email').hasError('email') ? 'Email no valido' :
        '';
  }

  onLogin(): void {
    this.authService.loginEmailUser(this.fgUsuario.get('email').value, this.fgUsuario.get('password').value)
      .then((res) => {
        this.onLoginRedirect();
    }).catch(err => this.showError(err));
    console.log(this.fgUsuario.get('email').value);
    console.log(this.fgUsuario.get('password').value);
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => this.showError(err));
  }

  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => this.showError(err));
  }

  onLogout() {
    this.authService.logoutUser();
  }

  showError(err){
    console.error('err', err.message)
  }
  
  onLoginRedirect(): void {
    this.router.navigate(['/app']);
  }

}
