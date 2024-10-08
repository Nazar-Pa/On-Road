import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit, OnDestroy {

  state$!: Observable<any>;
  modalDisplay: boolean = false;
  showLoginWarning: boolean = false;
  userId: any;
  driverCanRate: boolean = false;
  unsubscribe$ = new Subject<void>();
  filterField!: any;
  tripDetails: any;

  constructor(public activatedRoute: ActivatedRoute,
    public authService: AuthenticationService,
    private databaseService: DatabaseService) {
   }

  ngOnInit(): void {
    this.authService.currentUser$.pipe(takeUntil(this.unsubscribe$)).subscribe((user: any) => {
      this.userId = user?.uid;

      this.activatedRoute.queryParams.subscribe(
        (params: any) => {   
          const curdate = new Date(params['date'])    
  
          if(user?.uid && params) {
            this.filterField = {
              routeId: params['route_id'],
              u_id: user?.uid
            }

            this.databaseService.getSingleTripOfDriver(this.filterField).subscribe((trip: any) =>
              {
                this.tripDetails = trip;
                this.driverCanRate = user?.uid == trip[0].u_id ? false : true
              }
            )
          }
        }
      )

    })  
  }

  openModal(){
      if(this.userId && this.driverCanRate){
        this.modalDisplay = true;
      } else if(!this.userId) {
        this.showLoginWarning = true
      } 
      // else this.showLoginWarning = true
  }


  closeModal(event: any){
    if (event.target == document.getElementById("myModal")) {
        this.modalDisplay = false
        this.showLoginWarning = false;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.authService.newRoute$ = false;
  }

}
