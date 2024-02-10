import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import Cities from 'src/shared/Cities';
import Timeslots from 'src/shared/Timeslots';
import Prices from 'src/shared/Prices';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-publish-ride',
  templateUrl: './publish-ride.component.html',
  styleUrls: ['./publish-ride.component.scss']
})
export class PublishRideComponent implements OnInit {
  isDropDownShowing: boolean = false;
  panelOpenState = false;
  calendarOpenState = false;
  selected: Date = new Date();
  cityFrom: String = 'Bakı';
  cityTo: String = 'Quba';
  cities: string[] = [];
  timeSlots: String[] = [];
  prices: number[] = [];
  numbOfSeats: number = 1;
  time: string = "09:30";
  // price: number = 1;
  uid!: string | any;
  charCount: string = '';

  publishRideForm = new UntypedFormGroup({
    cityFrom: new UntypedFormControl('', Validators.required),
    cityTo: new UntypedFormControl('', Validators.required),
    selected: new UntypedFormControl(new Date(), Validators.required),
    time: new UntypedFormControl('', Validators.required),
    numbOfSeat: new UntypedFormControl('', Validators.required),
    price: new FormControl(5, Validators.required),
    car: new UntypedFormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    note: new UntypedFormControl('')
  })

  constructor(private databaseService: DatabaseService,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.cities = Cities;
    this.timeSlots = Timeslots;
    this.prices = Prices;
    this.authService.currentUser$.subscribe(user => {
      this.uid = user?.uid
      console.log(user?.uid)})
    if(window.innerWidth < 640) {
      this.calendarOpenState = true;
    }
  }

  onSubmit() {

    const { cityFrom, cityTo, selected, numbOfSeat, price, car, name, phoneNumber, note } = this.publishRideForm.value;

    console.log(this.publishRideForm.value)
    const [hours, minutes] = this.time.split(':');
    const [month, day, year] = selected.toLocaleDateString().split('/');

    const date = new Date(+year, +month-1, +day, +hours, +minutes, +0);

    const newRoute = {
      from: cityFrom,
      to: cityTo,
      date: moment(date).format('YYYY-MM-DD HH:mm'),
      numbOfPass: numbOfSeat,
      u_id: this.uid,
      price,
      carModel: car.toUpperCase(),
      name,
      phoneNumber,
      note
    }
    
    this.databaseService.createRoute(newRoute).subscribe((route) => {
      console.log(newRoute)
      this.router.navigate(['/trip'],
       { queryParams: {route_id: route.route_id} })
      
       this.authService.newRoute$ = true;
    
      });

    this.authService.newRoute$ = false;

    // this.publishRideForm.value.numbOfSeat = this.numbOfSeats;
    if (!this.publishRideForm.valid) return
  }

  handleClick(sign: string) {
    if(this.numbOfSeats >= 2 && sign == "subtract"){
      this.numbOfSeats = this.numbOfSeats - 1;
    } else if(sign == "add") {
      this.numbOfSeats = this.numbOfSeats + 1;
    }
  }

  showDropCalendar(e: Event) {
    this.isDropDownShowing = !this.isDropDownShowing;
    e.preventDefault();
  }
}
