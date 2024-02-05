import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators, FormControl } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Cities } from 'src/shared/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user$ = this.authService.currentUser$;
  selected: Date = new Date();
  cityFrom: string = 'Haradan?';
  cityTo: string = 'Haraya?';
  searchForm: UntypedFormGroup;
  cities: string[] = [];
  searchTerm$: any = new Subject();
  numbOfPassengers: number = 1; 
  isDropDownShowing: boolean = false;
  subscription!: Subscription;
  searchField: any;

  constructor(private formBuilder: UntypedFormBuilder,
    private authService: AuthenticationService,
    private router: Router){
    this.searchForm = this.createFormGroupWithBuilder(formBuilder);
  }

  ngOnInit(): void {
    this.cities = Cities;
  }

  onSubmit() {
    this.searchForm.value.numberOfPass = this.numbOfPassengers;
    if (this.searchForm.value.cityFrom !== 'Haradan?' && this.searchForm.value.cityTo !== 'Haraya?'){
    if (!this.searchForm.valid) return;

    const filterField = {
      from: this.searchForm.value.cityFrom,  
      to: this.searchForm.value.cityTo,
      date: this.searchForm.value.selected,  
      numbOfPass: this.searchForm.value.numberOfPass
    }

       this.router.navigate(['/search-result'],
       { queryParams: filterField })
  }
  // this.authService.getSearchIcon(false);
  }

  handleClick(sign: string) {
    if(this.numbOfPassengers >= 2 && sign == "subtract"){
      this.numbOfPassengers = this.numbOfPassengers - 1;
    } else if(sign == "add") {
      this.numbOfPassengers = this.numbOfPassengers + 1;
    }
  } 

  showDropCalendar() {
    this.isDropDownShowing = !this.isDropDownShowing;
  }

  createFormGroupWithBuilder(formBuilder: UntypedFormBuilder) {
    return formBuilder.group({
      cityFrom: new FormControl('Haradan?', Validators.required),
      cityTo: new FormControl('Haraya?', Validators.required),
      selected: new FormControl(new Date(), Validators.required),
      numberOfPass: new FormControl('')
    });
  }
}
