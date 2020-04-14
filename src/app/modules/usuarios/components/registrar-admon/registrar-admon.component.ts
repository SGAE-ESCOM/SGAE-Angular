import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_REGISTRAR_ADMON } from '@shared/routing-list/ListLinks';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TEXTO_CON_ESPACIOS } from '@shared/validators/regex';
import { passwordMatchValidator } from '@shared/validators/passwordValidators';

@Component({
  selector: 'app-registrar-admon',
  templateUrl: './registrar-admon.component.html',
  styleUrls: ['./registrar-admon.component.scss']
})
export class RegistrarAdmonComponent implements OnInit {

  hide: boolean = true;
  fgAdmin: FormGroup;

  constructor(private fb: FormBuilder) { 
    BreadcrumbComponent.update(BC_REGISTRAR_ADMON);
  }

  ngOnInit() {
    this.fgAdmin = this.fb.group({
      nombres: ['', [Validators.required, Validators.pattern( TEXTO_CON_ESPACIOS ) ]],
      apellidos: ['', [Validators.required, Validators.pattern( TEXTO_CON_ESPACIOS ) ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required ]],
      permiso: [false, Validators.required]
    },{
      validators: passwordMatchValidator
    });
  }

  getErrorMessage() {
    return this.fgAdmin.get('email').hasError('required') ? 'Debes ingresar un valor' :
      this.fgAdmin.get('email').hasError('email') ? 'Email no válido' :
        '';
  }

  getErrorNotMatch() {
    return this.fgAdmin.get('passwordRepeat').hasError('required') ? 'Debes ingresar un valor' :
      this.fgAdmin.get('passwordRepeat').hasError('mustMatch') ? 'Debe coincidir la contraseña' :
        '';
  }

  enviarFormulario(formulario) {
    console.log(formulario);
  }

}
