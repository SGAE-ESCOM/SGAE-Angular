import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* MAIN MODULES */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialTemplateModule } from '@template/angular-material-template.module';
import { AppRoutingModule } from './app-routing.module';

/* SERVICES */

/* PIPES */

/* COMPONENTS */
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BreadcrumbComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialTemplateModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }