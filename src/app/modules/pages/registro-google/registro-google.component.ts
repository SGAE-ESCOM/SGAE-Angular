import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '@services/auth.service';
import { TEXTO_CON_ESPACIOS } from '@shared/utils/validators/regex';
import { moveInLeft } from '@shared/utils/animations/router.animations';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-registro-google',
  templateUrl: './registro-google.component.html',
  styleUrls: ['./registro-google.component.scss'],
  animations: [moveInLeft()]
})
export class RegistroGoogleComponent implements OnInit {

  usuarioActual;

  fgUsuario: FormGroup;

  constructor(
    public afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router,
    private _authService: AuthService, private fb: FormBuilder, 
    private _toas: ToastrService) {
      this.route.queryParams.subscribe( params => {
        try{
          this.usuarioActual = JSON.parse(params['usuario']);
        }catch(error){
          this.router.navigate(['/login']);
        }
      });
  }

  ngOnInit() {
    this.fgUsuario = this.fb.group({
      nombres: ['', [Validators.required, Validators.pattern(TEXTO_CON_ESPACIOS)]],
      apellidos: ['', [Validators.required, Validators.pattern(TEXTO_CON_ESPACIOS)]],
    });
  }

  onFinalizarRegistro(informacionComplemento) {
    this._authService.finalizarRegistroGoogle(this.usuarioActual, informacionComplemento).then(
      result => {
        this._toas.success("Registro finalizado exitosamente");
        this.router.navigate(['/app'])
      }
    ).catch( err => this._toas.error("Ha ocurrido un error") );
  }
}
