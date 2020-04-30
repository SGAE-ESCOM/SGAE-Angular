import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_REGISTRAR_ADMON } from '@shared/routing-list/ListLinks';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { TEXTO_CON_ESPACIOS } from '@shared/validators/regex';
import { passwordMatchValidator } from '@shared/validators/passwordValidators';
import { GESTION_USUARIOS, GESTION_ETAPAS, PAGOS, CONVOCATORIA, EVALUACION, DOCUMENTACION } from '@shared/admin-permissions/permissions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';

@Component({
  selector: 'app-registrar-admon',
  templateUrl: './registrar-admon.component.html',
  styleUrls: ['./registrar-admon.component.scss']
})
export class RegistrarAdmonComponent implements OnInit {

  hide: boolean = true;
  gusuarios: boolean = false;
  getapas: boolean = false;
  gpagos: boolean = false;
  gconvocatoria: boolean = false;
  gevaluacion: boolean = false;
  gdocumentacion: boolean = false;
  fgAdmin: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService,
    private router: Router, private _toas: ToastrService, private _swal: SweetalertService) {
    BreadcrumbComponent.update(BC_REGISTRAR_ADMON);
  }

  ngOnInit() {
    this.fgAdmin = this.fb.group({
      nombres: ['', [Validators.required, Validators.pattern(TEXTO_CON_ESPACIOS)]],
      apellidos: ['', [Validators.required, Validators.pattern(TEXTO_CON_ESPACIOS)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
      permisos: [0, Validators.required]
    }, {
      validators: passwordMatchValidator
    });
  }

  getEmailErrorMessage() {
    return this.fgAdmin.get('email').hasError('required') ? 'Debes ingresar un valor' :
      this.fgAdmin.get('email').hasError('email') ? 'Email no válido' :
        '';
  }

  getNombreErrorMessage(){
    return this.fgAdmin.get('nombres').hasError('required') ? 'Debes ingresar un valor' :
      this.fgAdmin.get('nombres').hasError('pattern') ? 'Nombre no valido' :
        '';
  }

  getApellidoErrorMessage(){
    return this.fgAdmin.get('apellidos').hasError('required') ? 'Debes ingresar un valor' :
      this.fgAdmin.get('apellidos').hasError('pattern') ? 'Apellido no valido' :
        '';
  }

  getErrorNotMatch() {
    return this.fgAdmin.get('passwordRepeat').hasError('required') ? 'Debes ingresar un valor' :
      this.fgAdmin.get('passwordRepeat').hasError('mustMatch') ? 'Debe coincidir la contraseña' :
        '';
  }

  enviarFormulario(formulario: FormGroup) {
    if (formulario.valid) {
      let permisos = 0;
      permisos += this.gusuarios ? GESTION_USUARIOS : 0;
      permisos += this.getapas ? GESTION_ETAPAS : 0;
      permisos += this.gpagos ? PAGOS : 0;
      permisos += this.gconvocatoria ? CONVOCATORIA : 0;
      permisos += this.gevaluacion ? EVALUACION : 0;
      permisos += this.gdocumentacion ? DOCUMENTACION : 0;
      formulario.get('permisos').setValue(permisos);
      this._authService.registrarAdministrador(formulario.value)
        .then(res => {
          this._swal.adminRegistrado();
          this.router.navigate(['/app/usuarios/gestion-admon'])
        }
        ).catch(err => {
          console.error(err);
          this._swal.errorRegistroAdmin();
        });
    }else{
      this._toas.error("Formulario invalido")
    }
  }

}
