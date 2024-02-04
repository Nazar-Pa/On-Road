import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { Observable, Subject, Subscription, filter } from 'rxjs';
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

  constructor(private formBuilder: UntypedFormBuilder, 
    public authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute){
    this.searchForm = this.createFormGroupWithBuilder(formBuilder);
  }

  ngOnInit(): void {
    this.authService.searchIcon2$ = true
    if(window.innerWidth < 601) {
      this.showProfileCircle = false;
    }

    // this.router.events.pipe(
    //   filter((event: NavigationEnd) => event instanceof NavigationEnd)
          
    // ).subscribe(event => 
    //     {
    //       if(event.url.match(/search/)) {
    //         this.searchIcon = false;
    //         console.log(event?.url)
    //       }
    //       else this.searchIcon = true;
           
    //     }
    //   );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

  onSubmit() {
    console.log(this.searchForm.value)
  }

  setUrl() {
    // this.authService.getUrl("publish-ride")
    this.authService.currentUrl$ = 'publish-ride'
  }

  setIconFalse(){
    this.authService.getSearchIcon(false);
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
