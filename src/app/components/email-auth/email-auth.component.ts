import { Component, OnDestroy, OnInit } from '@angular/core';
import { updateProfile } from '@angular/fire/auth';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendSignInLinkToEmail, sendEmailVerification } from '@angular/fire/auth';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password != confirmPassword) {
      return {
        passwordsDontMatch: true
      }
    }
    return null;
  }
}

@Component({
  selector: 'app-email-auth',
  templateUrl: './email-auth.component.html',
  styleUrls: ['./email-auth.component.scss']
})
export class EmailAuthComponent implements OnInit {

  reCaptchaVerifier!: any;
  windowRef: any;
  user$ = this.authService.currentUser$;
  url!: string;
  displayName!: string;
  panelOpenState = false;
  emailVerified = false;

  signUpForm = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', [Validators.email, Validators.required]),
    password: new UntypedFormControl('', Validators.required),
    confirmPassword: new UntypedFormControl('', Validators.required)
  }, { validators: passwordMatchValidator() })

  constructor(private authService: AuthenticationService,
    private databaseService: DatabaseService,
    private router: Router,
    private auth: Auth
    ) { }

  ngOnInit(): void {
    this.windowRef = window;
  }

  submit() {
    if (!this.signUpForm.valid) return;

    const { name, email, password } = this.signUpForm.value;
    this.authService.signUp(email, password).subscribe(res => {
      // this.router.navigate([''])
      updateProfile(res.user, {displayName: name});
      this.databaseService.createUser({name: name.toUpperCase(), email, u_id: res?.user?.uid}).subscribe();
      // this.authService.getName(name);

      if(this.authService.currentUrl$ == "publish-ride") {
        this.router.navigate(['/publish-ride'])
        // this.authService.getUrl("");
        this.authService.currentUrl$ = '';
      } else this.router.navigate([''])
    })
  }

  submit2() {
    const { name, email, password } = this.signUpForm.value;
    var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'http://localhost:4200/redirect',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
          bundleId: 'com.example.ios'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
        },
        dynamicLinkDomain: 'example.page.link'
      };

      firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

}
