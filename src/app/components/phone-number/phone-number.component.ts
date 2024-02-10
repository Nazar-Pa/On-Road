import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore';
import { Subject, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss']
})
export class PhoneNumberComponent implements OnInit {

  reCaptchaVerifier!: any;
  windowRef: any;
  _phoneNmb: string = "";
  searchTerm$: any = new Subject();
  numberNotValid: boolean = false;
  subscription!: Subscription;
  url!: string;

  signUpFormWithPhone = new FormGroup({
    phoneNumber: new FormControl('', Validators.required)})

  constructor(private ngZone: NgZone,
    private router: Router,
    private authService: AuthenticationService) { }

    config = {
      allowNumbersOnly: true,
      length: 10,
      isPasswordInput: false,
      disableAutoFocus: false,
      placeholder: '',
      inputStyles: {
        width: '30px',
        height: '30px',
      },
    };

  ngOnInit(): void {
    this.searchTerm$.pipe().subscribe((v: any) => {     
    })
    
    this.windowRef = window;
    // this.subscription = this.authService.currentUrl.subscribe(result => console.log(result));
    console.log(this.authService.currentUrl$)
  }

  getOTP(){
    // if(this._phoneNmb.length < 15){
    //   this.numberNotValid = true
    //   console.log(this._phoneNmb)
    //   return
    // }
    if(!this.signUpFormWithPhone.valid){
      return
    }
    
    const number = '+994' + this.signUpFormWithPhone.value.phoneNumber
    console.log(number)

    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
      }
    );

    firebase
      .auth()
      .signInWithPhoneNumber(number || '', this.reCaptchaVerifier)
      .then((confirmationResult: any) => {
        localStorage.setItem(
          'verificationId',
          JSON.stringify(confirmationResult.verificationId)
        );
        this.ngZone.run(() => {
          this.router.navigate(['/code']);
        });
      })
      .catch((error: any) => {
        console.log(error.message);
        // alert(error.message);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 5000);
      });
  }

  get phoneNumber() {
    return this.signUpFormWithPhone.get('phoneNumber');
  }

  get phoneNmb(){
    return this._phoneNmb
  }

  set phoneNmb(value: string){
    this._phoneNmb = value;
    this.searchTerm$.next(value)
  }

}
