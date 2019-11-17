import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* COMPONENTS */
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BreadcrumbComponent } from './components/shared/breadcrumb/breadcrumb.component';
import { TemplateModule } from './components/template/template.module';
import { AngularMaterialModule } from './components/template/angular-material.module';
import { ReversePipe } from './pipes/reverse.pipe';
import { ToastMessageComponent } from './components/shared/toast-message/toast-message.component';
import { MessagesSnackComponent } from './components/shared/messages-snack/messages-snack.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    BreadcrumbComponent,
    ReversePipe,
    ToastMessageComponent,
    MessagesSnackComponent,
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    TemplateModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }