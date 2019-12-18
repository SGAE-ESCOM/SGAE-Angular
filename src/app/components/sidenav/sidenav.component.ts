import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { linksMainPage, linksAdmin } from './sidenav-links';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  navigationLinks = linksMainPage;
  isLoggedIn: boolean = false;
  
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, 
    private _authService:AuthService, private _afsAuth: AngularFireAuth,
    private router: Router) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this._authService.isAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.navigationLinks = linksAdmin;
      } else {
        this.isLoggedIn = false;
        this.navigationLinks = linksMainPage;
      }
    });
  }

  onLogout() {
    this._afsAuth.auth.signOut();
    this.router.navigate(['']);
  }
}