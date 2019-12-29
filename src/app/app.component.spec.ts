import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SidenavComponent } from '@components/sidenav/sidenav.component';
import { AngularMaterialTemplateModule } from "@template/angular-material-template.module";
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        AngularMaterialTemplateModule,
      ],
      declarations: [
        AppComponent,
        SidenavComponent,
        BreadcrumbComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
