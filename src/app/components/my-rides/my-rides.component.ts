import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { OwnTrip, Trip } from 'src/shared/interfaces';

@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.component.html',
  styleUrls: ['./my-rides.component.scss']
})
export class MyRidesComponent implements OnInit, OnDestroy {

  allTripsOfDriver: any[] = [];
  removeBtnClicked = false;
  clickedIndex = 0;
  unsubscribe$ = new Subject<void>();
  showWarning: boolean = false;
  showNoTrips: boolean = false;

  constructor(private authService: AuthenticationService,
    private dataService: DatabaseService) { }

  ngOnInit(): void {
    this.authService.currentUser$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
      console.log(user?.uid)
      this.dataService.getAllTripsOfDriver(user?.uid).subscribe(trips => {
        this.allTripsOfDriver = trips
        this.showNoTrips = !trips
        // if(Object.assign([], trips).length == 0) { this.showNoTrips = true }
      })
    })
  }

  showRemoveBtn(routeId: number){
    this.clickedIndex = this.clickedIndex == 0 ? routeId : 0 
    this.showWarning =  false;   
  }

  removeTrip(routeId: number) {

      this.dataService.deleteTrip(routeId).subscribe(
        () => 
        this.allTripsOfDriver.map((row: any)=> {
          row.data.filter((data: Trip)=> 
          {
          if(routeId == data.route_id){
            const i = row.data.indexOf(data)
            row.data.splice(i, 1)
            }
          }
        )
        }))

        this.clickedIndex = 0;
        this.showWarning =  false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
