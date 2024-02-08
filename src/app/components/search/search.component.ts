import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Cities from 'src/shared/Cities';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  subscription!: Subscription;
  isDropDownShowing: boolean = false;
  selected: Date = new Date();
  cities: string[] = [];
  filterField!: any;  


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService) { 
      this.searchForm = new FormGroup({
        cityFrom: new FormControl('Haradan?', Validators.required),
        cityTo: new FormControl('Haraya?', Validators.required),
        selected: new FormControl(new Date(), Validators.required),
        numberOfPass: new FormControl<number>(1)
      })
    }

  ngOnInit(): void {
    this.cities = Cities;
  }

  onSubmit() {
    if (this.searchForm.value.cityFrom !== 'Haradan?' && this.searchForm.value.cityTo !== 'Haraya?'){
    if (!this.searchForm.valid) return;

    this.filterField = {
      from: this.searchForm.value.cityFrom,  
      to: this.searchForm.value.cityTo,
      date: this.searchForm.value.selected,  
      numbOfPass: this.searchForm.value.numberOfPass
    }

    this.router.navigate(
      ['/search-result'],
      {
        relativeTo: this.route,
        queryParams: this.filterField, 
        queryParamsHandling: 'merge'
      }
    )
  }
  }


  handleClick(sign: string) {
    if(this.searchForm.value.numberOfPass >= 2 && sign == "subtract"){
      this.searchForm.controls['numberOfPass'].setValue(this.searchForm.value.numberOfPass - 1)
    } else if(sign == "add") {
      this.searchForm.controls['numberOfPass'].setValue(this.searchForm.value.numberOfPass + 1)
    }
  } 

  showDropCalendar() {
    this.isDropDownShowing = !this.isDropDownShowing;
  }

}
