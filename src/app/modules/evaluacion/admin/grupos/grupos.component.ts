import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { AuthService } from '@services/auth.service';
import { BC_GESTIONAR_GRUPOS } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  nombreGrupo: FormControl;
  
  constructor(private usuario: AuthService) {
    BreadcrumbComponent.update(BC_GESTIONAR_GRUPOS);
  }

  ngOnInit(): void {
  }

}
