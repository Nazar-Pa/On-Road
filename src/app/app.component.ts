import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { Observable, Subject, Subscription, filter, takeUntil } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blablacar';
  showProfileCircle: boolean = true;
  _cityFrom: String = 'Bakı';
  _cityTo: String = '';
  isDropDownShowing: boolean = false;
  isDropDownShowingTo: boolean = false;
  searchForm: UntypedFormGroup;
  cities: String[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven','eight', 'nine', 'ten', 'eleven', 'twelve'];
  filteredCities: String[] = [];
  searchTerm$: any = new Subject();
  searchIcon: boolean = true;
  subscription!: Subscription;
  unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: UntypedFormBuilder, 
    public authService: AuthenticationService,
    private router: Router){
    this.searchForm = this.createFormGroupWithBuilder(formBuilder);
  }

  ngOnInit(): void {
    if(window.innerWidth < 601) {
      this.showProfileCircle = false;
    }

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      takeUntil(this.unsubscribe$)
    ).subscribe(event => 
        {
          if(event.url.match(/search/)) {
            this.searchIcon = false;
          }
          else this.searchIcon = true;  
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

  setUrl() {
    // this.authService.getUrl("publish-ride")
    this.authService.currentUrl$ = 'publish-ride'
  }

  dropDownOpen(){
    this.isDropDownShowing = !this.isDropDownShowing
    this.filteredCities = this.cities
  }

  createFormGroupWithBuilder(formBuilder: UntypedFormBuilder) {
    return formBuilder.group({
      cityFrom: new UntypedFormControl(''),
      cityTo: new UntypedFormControl(''),
      date: new UntypedFormControl(''),
      numberOfPass: new UntypedFormControl('')
    });
  }
}
