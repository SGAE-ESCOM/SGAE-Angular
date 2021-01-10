import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioInterface } from '@models/persona/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ver-aspirante',
  templateUrl: './ver-aspirante.component.html',
  styleUrls: ['./ver-aspirante.component.scss']
})
export class VerAspiranteComponent implements OnInit {

  usuario: UsuarioInterface;
  id;

  constructor(private _router: Router, private _toast: ToastrService) {
    const navigation = this._router.getCurrentNavigation();
    if( navigation.extras.state ){
      this.id = JSON.parse(navigation.extras.state.userId);
      console.log(this.id);
    }else{
      this._toast.error("Hubo un error al cargar información");
      this._router.navigate(['/app/usuarios/gestion-aspirantes/revisar-aspirantes'])
    }
  }

  ngOnInit(): void {
  }

}
