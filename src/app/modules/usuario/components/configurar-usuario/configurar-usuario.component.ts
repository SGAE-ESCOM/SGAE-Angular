import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { UsuarioInterface } from '@models/persona/usuario';
import { AuthService } from '@services/auth.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { BC_CONFIGURAR_USUARIO } from '@shared/routing-list/ListLinks';
import { TEXTO_CON_ESPACIOS } from '@shared/utils/validators/regex';

@Component({
  selector: 'app-configurar-usuario',
  templateUrl: './configurar-usuario.component.html',
  styleUrls: ['./configurar-usuario.component.scss']
})
export class ConfigurarUsuarioComponent implements OnInit {

  usuario: UsuarioInterface;
  fgUser: FormGroup;
  btnActualizar = false;

  constructor(private fb: FormBuilder, private _usuarioService: UsuarioService, private _swal: SweetalertService, 
        private _authService: AuthService, private router: Router) { 
    BreadcrumbComponent.update(BC_CONFIGURAR_USUARIO);

  }

  ngOnInit(): void {
    this.fgUser = this.fb.group({
      nombres: ['', [Validators.required, Validators.pattern(TEXTO_CON_ESPACIOS)]],
      apellidos: ['', [Validators.required, Validators.pattern(TEXTO_CON_ESPACIOS)]]
    });
    this.getUsuarioActual();
  }

  getUsuarioActual() {
    this._authService.isAuth().subscribe(auth => {
      if (auth) {
        this._authService.findUsuario(auth.uid).subscribe((usuario: UsuarioInterface) => {
          if (usuario) {
            this.usuario = usuario;
            this.fgUser.get('nombres').setValue(this.usuario.nombres);
            this.fgUser.get('apellidos').setValue(this.usuario.apellidos);
          }
        }, error => {
          this._swal.errorActualizar();
          this.router.navigate(['/app']);
        });
      } 
    });
  }

  actualizarInformacion(formulario: FormGroup){
    if(formulario.valid){
      let data: UsuarioInterface = formulario.value;
      this._usuarioService.updateUsuario(this.usuario, data).then(() => {
        this._swal.actualizadoCorrecto("Los datos se actualizarón exitosamente.");
        this.usuario.nombres = data.nombres;
        this.usuario.apellidos = data.apellidos;
      }).catch( err => {
        this._swal.errorActualizarAdmin();
        this.fgUser.get('nombres').setValue(this.usuario.nombres);
        this.fgUser.get('apellidos').setValue(this.usuario.apellidos);
      });
      this.btnActualizar = false;
    }
  }


  getNombreErrorMessage(){
    return this.fgUser.get('nombres').hasError('required') ? 'Este campo es requerido' :
      this.fgUser.get('nombres').hasError('pattern') ? 'Nombre no valido' :
        '';
  }

  getApellidoErrorMessage(){
    return this.fgUser.get('apellidos').hasError('required') ? 'Este campo es requerido' :
      this.fgUser.get('apellidos').hasError('pattern') ? 'Apellido no valido' :
        '';
  }

}
