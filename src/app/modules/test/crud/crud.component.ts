import { Component, Inject } from '@angular/core';
import { BreadcrumbComponent } from '@breadcrumb/breadcrumb.component';
import { BD_FORMS_AND_VALIDATION } from '@breadcrumb/ListLinks';
import { User } from '@models/template/User';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {

  user: User;
  hide = true;

  constructor() {
    this.user = new User("Andres", "Lopez", "andres@gmail.com", "5512345678", "HolaMundo");
    BreadcrumbComponent.update(BD_FORMS_AND_VALIDATION);
  }


}
