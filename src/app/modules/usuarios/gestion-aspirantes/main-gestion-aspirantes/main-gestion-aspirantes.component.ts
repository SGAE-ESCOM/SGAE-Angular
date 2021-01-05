import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { AuthService } from '@services/auth.service';
import { BC_GESTION_ASPIRANTES, LINKS_GESTION_ASPIRANTES } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-main-gestion-aspirantes',
  templateUrl: './main-gestion-aspirantes.component.html',
  styleUrls: ['./main-gestion-aspirantes.component.scss']
})
export class MainGestionAspirantesComponent implements OnInit {

  cards;

  constructor(private _authServices: AuthService, private router: Router) { 
    BreadcrumbComponent.update(BC_GESTION_ASPIRANTES);
    this.cards = LINKS_GESTION_ASPIRANTES;
  }

  ngOnInit(): void {
  }

}
