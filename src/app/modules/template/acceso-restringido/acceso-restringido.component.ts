import { Component, OnInit } from '@angular/core';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceso-restringido',
  templateUrl: './acceso-restringido.component.html',
  styleUrls: ['./acceso-restringido.component.scss']
})
export class AccesoRestringidoComponent implements OnInit {

  constructor(private _swal: SweetalertService, private router: Router) { }

  ngOnInit(): void {
    this._swal.errorAccesoRestringido().then(()=>{
      this.router.navigate(['/app']);
    })
  }

}
