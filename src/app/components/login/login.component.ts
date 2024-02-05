import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  url!: string;
  subscription!: Subscription;

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required)
  })

  constructor(private authService: AuthenticationService, 
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.subscription = this.authService.currentUrl.subscribe(result => this.url= result); 
    console.log(this.authService.currentUrl$)
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  submit() {
    if(!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(() => {
      
      if(this.authService.currentUrl$ == "publish-ride") {
        this.router.navigate(['/publish-ride'])
        this.authService.currentUrl$ = ''
      } else this.router.navigate([''])
    })
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
