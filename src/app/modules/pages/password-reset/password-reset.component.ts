import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { moveInLeft } from '@shared/utils/animations/router.animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  animations: [moveInLeft()]
})
export class PasswordResetComponent implements OnInit {

  fgEmail: FormGroup;

  constructor(public afAuth: AngularFireAuth, private router: Router, private _authService: AuthService, 
      private fb: FormBuilder,  private _toast: ToastrService) { 
    
  }

  resetPassword(form){
    try{
      this._authService.passwordReset(form.email).then(()=>{
        this._toast.success("Correo enviado, revisa tu bandeja de entrada.");
        this.router.navigate(['/login']);
      });
    }catch(error){
      console.log(error);
    }
  }

  ngOnInit() {
    this.fgEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  getErrorMessage() {
    return this.fgEmail.get('email').hasError('required') ? 'Este campo es requerido' :
      this.fgEmail.get('email').hasError('email') ? 'Email no válido' :
        '';
  }

  showError(err) {
    console.log(err);
    this._toast.error(err.message);
  }
}
