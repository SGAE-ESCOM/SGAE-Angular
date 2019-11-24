import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* MODULES */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialTemplateModule } from '@template/angular-material-template.module';
import { TemplateModule } from '@modules/template/template.module';
import { AppRoutingModule } from './app-routing.module';

/* SERVICES */

/* COMPONENTS */
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { ToastMessageComponent } from '@shared/toast-message/toast-message.component';
import { MessagesSnackComponent } from '@shared/messages-snack/messages-snack.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

/* PIPES */
import { ReversePipe } from '@pipes/reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BreadcrumbComponent,
    ToastMessageComponent,
    MessagesSnackComponent,
    DashboardComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialTemplateModule,
    TemplateModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }