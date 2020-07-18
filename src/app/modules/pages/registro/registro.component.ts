import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '@services/auth.service';
import { passwordMatchValidator } from '@shared/validators/passwordValidators';
import { TEXTO_CON_ESPACIOS } from '@shared/validators/regex';
import { moveInLeft } from '@shared/animations/router.animations';
import { ToastrService } from 'ngx-toastr';

const AUTH_ERROR = {
  "auth/weak-password" : {
    message : "La contraseña debe tener al menos 6 caracteres."
  },
  "auth/email-already-in-use" : {
    message: "La dirección de correo electrónico ya está en uso por otra cuenta."
  }
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  animations: [moveInLeft()]
})
export class RegistroComponent implements OnInit {

  hide: boolean = true;
  isError: boolean = false;
  fgUsuario: FormGroup;

  constructor(
    public afAuth: AngularFireAuth, private router: Router,
    private _authService: AuthService, private fb: FormBuilder, 
    private _toast: ToastrService
  ) {
    
  }

  ngOnInit() {
    this.fgUsuario = this.fb.group({
      nombres: ['', [Validators.required, Validators.pattern( TEXTO_CON_ESPACIOS ) ]],
      apellidos: ['', [Validators.required, Validators.pattern( TEXTO_CON_ESPACIOS ) ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6) ]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(6) ]]
    },{
      validators: passwordMatchValidator
    });
  }

  onRegistrar( usuario ){
    this._authService.registrarUsuario( usuario )
    .then( res => this.router.navigate(['/app'] )
    ).catch(err => this.showError(err));
  }

  getErrorMessage() {
    return this.fgUsuario.get('email').hasError('required') ? 'Este campo es requerido' :
      this.fgUsuario.get('email').hasError('email') ? 'Email no válido' :
        '';
  }

  getErrorNotMatch() {
    return this.fgUsuario.get('passwordRepeat').hasError('required') ? 'Este campo es requerido' :
      this.fgUsuario.get('passwordRepeat').hasError('mustMatch') ? 'Debe coincidir la contraseña' :
        '';
  }

  showError(err) {
    console.log(err);
    err = AUTH_ERROR[err.code];
    this._toast.error(err.message);
  }
}
