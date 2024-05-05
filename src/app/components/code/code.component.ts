import { Component, OnInit, NgZone } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore';
import { User, updateProfile } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  verify: any;
  name!: string;
  url!: string;
  subscription!: Subscription;
  verifyOTPform = new UntypedFormGroup({
    code: new UntypedFormControl('', Validators.required),
    name: new UntypedFormControl('', Validators.required)
  })

  constructor(private router: Router, private ngZone: NgZone,
    private databaseService: DatabaseService,
    private authService: AuthenticationService) { }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  ngOnInit(): void {
    // this.subscription = this.authService.currentUrl.subscribe(result => this.url= result);
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
  }

  onOtpChange(otp: string) {
    this.verifyOTPform.value.code = otp;
  }

  verifyOTP(){
    var credential = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.verifyOTPform.value.code
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((response) => {
        localStorage.setItem('user_data', JSON.stringify(response));
        this.ngZone.run(() => {
          // this.router.navigate([''])
          updateProfile(response?.user as User, {displayName: this.name});
          this.databaseService.createUser({
            name: this.name.toUpperCase(), 
            email: "",
            phone: response.user?.phoneNumber, 
            u_id: response?.user?.uid})
            .subscribe();
          // this.authService.getName(this.name);

          if(this.authService.currentUrl$ == "publish-ride") {
            this.router.navigate(['/publish-ride'])
            this.authService.currentUrl$ = '';
          } else this.router.navigate([''])
        });
      })
      .catch((error) => {
        alert(error.message);
      });
   }

}
