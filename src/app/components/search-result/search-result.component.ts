import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import Cities from 'src/shared/Cities';
import { Trip } from 'src/shared/Trip';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  tableContent = [{id: 0, name: ''}];

  searchForm: FormGroup;
  paramsFrom!: string;
  paramsTo!: string;
  paramsDate!: Date;
  params: boolean = false;
  routeDirection!: any;
  tripsList: Trip[] = [
  //   {
  //     route_id: 124,
  //     from_city: "Bakı",
  //     to_city: "Quba",
  //     route_date: new Date("2023-06-03T07:30:00.000Z"),
  //     numb_of_pass: "1",
  //     price: "5",
  //     u_id: "qLPXEna6v5gikPrwEqfZgu31Xcq1",
  //     note: "Test note",
  //     car_model: "Mersedec"
  // },
  // {
  //     route_id: 123,
  //     from_city: "Bakı",
  //     to_city: "Quba",
  //     route_date: new Date("2023-06-03T07:30:00.000Z"),
  //     numb_of_pass: "1",
  //     price: "5",
  //     u_id: "qLPXEna6v5gikPrwEqfZgu31Xcq1",
  //     note: "Test note",
  //     car_model: "Mersedec"
  // }    
]

  filterField!: any;
  modalDisplay: boolean = false;
  isDropDownShowing: boolean = false;
  selected: Date = new Date();
  cities: string[] = []; 

  constructor(private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService) {
      this.searchForm = new FormGroup({
        cityFrom: new FormControl('', Validators.required),
        cityTo: new FormControl('', Validators.required),
        selected: new FormControl(new Date(), Validators.required),
        numberOfPass: new FormControl<number>(1)
      })
     }

  ngOnInit(): void {

    this.cities = Cities;

    this.route.queryParams.subscribe(
      params => {
        this.params = params['date'] ? true : false;
        this.paramsTo = params['to'] ? params['to'] : '';
        this.paramsFrom = params['from'] ? params['from'] : '';
        // this.paramsDate = params['date'] ? new Date(params['date']) : new Date('');
        this.selected = params['date'] ? new Date(params['date']) : new Date();
        this.searchForm.controls['numberOfPass'].setValue(parseInt(params['numbOfPass']))
        this.searchForm.controls['cityFrom'].setValue(params['from'])
        this.searchForm.controls['cityTo'].setValue(params['to'])
        this.searchForm.controls['selected'].setValue(new Date(params['date']))
        this.databaseService.getFilteredRoutes(params).subscribe(routes => {
          // console.log(routes)
          this.tripsList = routes
          this.routeDirection = routes[0]
        })
      }
    )
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
      [],
      {
        relativeTo: this.route,
        queryParams: this.filterField, 
        queryParamsHandling: 'merge'
      }
    )

    this.databaseService.getFilteredRoutes(this.filterField).subscribe(routes => {
      this.tripsList = routes
      this.routeDirection = routes[0]
    })
  }
  this.modalDisplay = false
 
  }


  openTrip(route: any) {
    this.router.navigate(['/trip'],
       { queryParams: {route_id: route.route_id, from: route.from_city, to: route.to_city, date: route.route_date, numbOfPass: route.numb_of_pass} })
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

  openModal(){
    this.modalDisplay = true;
  }

  closeModal(event: any){
    if (event.target == document.getElementById("myModal")) {
        this.modalDisplay = false
    }
  }


}
