import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_REGISTRAR_ADMON, BC_USUARIOS } from '@shared/routing-list/ListLinks';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { TEXTO_CON_ESPACIOS } from '@shared/validators/regex';
import { passwordMatchValidator } from '@shared/validators/passwordValidators';
import { GESTION_USUARIOS, GESTION_ETAPAS, GESTION_PAGOS, GESTION_CONV, GESTION_EVAL, GESTION_DOC, sinAcceso } from '@shared/admin-permissions/permissions';
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

  constructor(private fb: FormBuilder, private _authService: AuthService, private _authServices: AuthService,
        private router: Router, private _toas: ToastrService, private _swal: SweetalertService) {
    let usuario = this._authServices.getUsuarioC();
    BreadcrumbComponent.update(BC_USUARIOS);
    if(usuario.rol != 'root') sinAcceso(router);
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
    return this.fgAdmin.get('email').hasError('required') ? 'Este campo es requerido' :
      this.fgAdmin.get('email').hasError('email') ? 'Email no válido' :
        '';
  }

  getNombreErrorMessage(){
    return this.fgAdmin.get('nombres').hasError('required') ? 'Este campo es requerido' :
      this.fgAdmin.get('nombres').hasError('pattern') ? 'Nombre no valido' :
        '';
  }

  getApellidoErrorMessage(){
    return this.fgAdmin.get('apellidos').hasError('required') ? 'Este campo es requerido' :
      this.fgAdmin.get('apellidos').hasError('pattern') ? 'Apellido no valido' :
        '';
  }

  getErrorNotMatch() {
    return this.fgAdmin.get('passwordRepeat').hasError('required') ? 'Este campo es requerido' :
      this.fgAdmin.get('passwordRepeat').hasError('mustMatch') ? 'Debe coincidir la contraseña' :
        '';
  }

  cancelarRegistro(){
    this._swal.cancelarRegistroAdmin(`¿Desea cancelar el registro?`)
    .then((result) => {
      if (result.value) this.router.navigate(['/app/usuarios/gestion-admon']);
    });
  }

  enviarFormulario(formulario: FormGroup) {
    if (formulario.valid) {
      let permisos = 0;
      permisos += this.gusuarios ? GESTION_USUARIOS : 0;
      permisos += this.getapas ? GESTION_ETAPAS : 0;
      permisos += this.gpagos ? GESTION_PAGOS : 0;
      permisos += this.gconvocatoria ? GESTION_CONV : 0;
      permisos += this.gevaluacion ? GESTION_EVAL : 0;
      permisos += this.gdocumentacion ? GESTION_DOC : 0;

      if(permisos != 0){
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
        this._toas.error("Asigne al menos un permiso");
      }
    }else{
      this._toas.error("Llena todos los campos requeridos");
    }
  }

}
