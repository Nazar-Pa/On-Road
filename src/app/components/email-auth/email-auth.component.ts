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
