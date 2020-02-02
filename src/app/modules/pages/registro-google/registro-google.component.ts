import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '@services/auth.service';
import { TEXTO_CON_ESPACIOS } from '@shared/validators/regex';
import { moveInLeft } from '@shared/animations/router.animations';
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
    //let usuarioCompleto = { ... informacionComplemento, ... this.usuarioActual };
    console.log( this.usuarioActual );
    console.log( informacionComplemento );
    this._authService.finalizarRegistroGoogle(this.usuarioActual, informacionComplemento).then(
      result => console.log(result)
    ).catch( err => console.log(err) );
  }
}
