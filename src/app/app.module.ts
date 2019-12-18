import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* MAIN MODULES */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialTemplateModule } from '@template/angular-material-template.module';
import { MaterialMessagesModule } from '@modules/template/material-messages.module';
import { AppRoutingModule } from './app-routing.module';

/* FIREBASE MODULES */
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

/* SERVICES */

/* PIPES */

/* COMPONENTS */
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { MessagesSnackComponent } from '@shared/messages-snack/messages-snack.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BreadcrumbComponent,
    MessagesSnackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialTemplateModule,
    MaterialMessagesModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }