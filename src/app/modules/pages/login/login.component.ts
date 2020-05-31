import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { moveInLeft } from '@shared/animations/router.animations';

const AUTH_ERROR = {
  "auth/wrong-password" : {
    message : "La contraseña no es válida o el usuario no tiene una contraseña."
  },
  "auth/invalid-email" : {
    message: "La dirección de correo electrónico no tiene el formato correcto."
  },
  "auth/network-request-failed": {
    message: "Se ha producido un error de red (como tiempo de espera, conexión interrumpida o host inaccesible)."
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveInLeft()]
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  isError: boolean = false;
  fgUsuario: FormGroup;

  constructor(
    public afAuth: AngularFireAuth, private router: Router,
    private authService: AuthService, private fb: FormBuilder,
    private _toats: ToastrService, private ngZone: NgZone) {
  }

  ngOnInit() {
    this.fgUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  getErrorMessage() {
    return this.fgUsuario.get('email').hasError('required') ? 'Debes ingresar un valor' :
      this.fgUsuario.get('email').hasError('email') ? 'Email no válido' :
        '';
  }

  onLogin(): void {
    this.authService.loginEmailUser(this.fgUsuario.get('email').value, this.fgUsuario.get('password').value)
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => this.showError(err));
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((result) => {
        this.ngZone.run(() => {
          if (result.additionalUserInfo.isNewUser)
            this.onRegistroRedirect(result.user);
          else
            this.onLoginRedirect();
        });
      }).catch(err => this.showError(err));
  }

  onLogout() {
    this.authService.logoutUser();
  }

  showError(err) {
    console.log(err);
    err = AUTH_ERROR[err.code];
    this._toats.error(err.message);
  }

  onLoginRedirect(): void {
    this.router.navigate(['/app']);
  }

  onRegistroRedirect(usuario): void {
    const infoUsuario = {
      uid: usuario.uid,
      email: usuario.email
    }
    this.router.navigate(['/registro-goolge'], { queryParams: { usuario: JSON.stringify(infoUsuario) } });
  }
}
