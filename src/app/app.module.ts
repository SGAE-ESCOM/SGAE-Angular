import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* MAIN MODULES */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialTemplateModule } from '@template/angular-material-template.module';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from "@shared/utils/traduccion/custom-paginator";

/* FIREBASE MODULES */
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

/* SERVICES */
import { AuthService } from '@services/auth.service';

/* COMPONENTS */
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { PagosAdminModule } from './modules/pagos/admin/pagos-admin.module';
import { PagosAspiranteModule } from './modules/pagos/aspirante/pagos-aspirante.module';
  
@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialTemplateModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    PagosAdminModule,
    PagosAspiranteModule
  ],
  entryComponents: [ BreadcrumbComponent ],
  providers: [AngularFireAuth, AngularFirestore, AuthService, { provide: MatPaginatorIntl, useValue: CustomPaginator() }],
  bootstrap: [AppComponent]
})
export class AppModule { }