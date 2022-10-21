import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss']
})
export class SigningComponent implements OnInit {

  signinForm!: FormGroup;
  errorMessage !:string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }

  initSigninForm(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initSigninForm();
  }

  onSubmitSigninForm(): void {
    this.authService.signinUser(this.signinForm.value.email, this.signinForm.value.password)
    .then(() => {
      this.router.navigate(['/admin', 'dashboard']);
    }).catch((error)=>{
      if(error =="FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."){
        this.errorMessage="Pas d'utilisateur enregistré avec ces identifiants";
      }
       else if(this.errorMessage =="FirebaseError: Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)."){
        this.errorMessage="Mot de passe Erroné"
       }


    });
  }
}
