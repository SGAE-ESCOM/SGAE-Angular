import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { UsuarioInterface } from '@models/persona/usuario';
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

  constructor(private fb: FormBuilder) { 
    BreadcrumbComponent.update(BC_CONFIGURAR_USUARIO);
  }

  ngOnInit(): void {
    this.fgUser = this.fb.group({
      nombres: ['', [Validators.required, Validators.pattern(TEXTO_CON_ESPACIOS)]],
      apellidos: ['', [Validators.required, Validators.pattern(TEXTO_CON_ESPACIOS)]]
    });
  }

  actualizarInformacion(formulario: FormGroup){
    // if(formulario.valid){
    //   let data = formulario.value;
    //   this._adminService.updateInformacionAdministrador(this.usuario, data).then(() => {
    //     this._swal.informacionAdminActualizada();
    //     this.usuario.nombres = data.nombres;
    //     this.usuario.apellidos = data.apellidos;
    //   }).catch( err => {
    //     this._swal.errorActualizarAdmin();
    //     this.fgAdmin.get('nombres').setValue(this.usuario.nombres);
    //     this.fgAdmin.get('apellidos').setValue(this.usuario.apellidos);
    //   });
    //   this.btnIDisable = true;
    // }
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
