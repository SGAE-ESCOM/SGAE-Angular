import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '@services/auth.service';
import { passwordMatchValidator } from '@shared/validators/passwordValidators';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  hide: boolean = true;
  isError: boolean = false;
  fgUsuario: FormGroup;

  constructor(
    public afAuth: AngularFireAuth, private router: Router,
    private _authService: AuthService, private fb: FormBuilder
  ) {
    
  }

  ngOnInit() {
    this.fgUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required ]]
    },{
      validators: passwordMatchValidator
    });
  }

  onRegisterUser(){
    this._authService.registerUser(this.fgUsuario.get('email').value, this.fgUsuario.get('password').value)
    .then( res => this.router.navigate(['/login'])
    ).catch(err => console.error(err));
  }

  getErrorMessage() {
    return this.fgUsuario.get('email').hasError('required') ? 'Debes ingresar un valor' :
      this.fgUsuario.get('email').hasError('email') ? 'Email no valido' :
        '';
  }

  getErrorNotMatch() {
    return this.fgUsuario.get('passwordRepeat').hasError('required') ? 'Debes ingresar un valor' :
      this.fgUsuario.get('passwordRepeat').hasError('mustMatch') ? 'Debe coincidir la contraseña' :
        '';
  }
}
