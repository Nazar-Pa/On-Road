import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import myLocaleAz from '@angular/common/locales/az-Latn'

import {registerLocaleData} from '@angular/common';

registerLocaleData(myLocaleAz);

import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card'
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion'

import { NgOtpInputModule } from 'ng-otp-input';
import { NgxMaskModule, IConfig  } from 'ngx-mask';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { EmailAuthComponent } from './components/email-auth/email-auth.component';
import { PublishRideComponent } from './components/publish-ride/publish-ride.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SearchComponent } from './components/search/search.component';
import { MyRidesComponent } from './components/my-rides/my-rides.component';
import { TripComponent } from './components/trip/trip.component';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { PhoneNumberComponent } from './components/phone-number/phone-number.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { appReducer } from './store/app.state';
import { RoutesEffects } from './components/search-result/state/routes.effects';
import { CodeComponent } from './components/code/code.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    LoginComponent,
    EmailAuthComponent,
    PublishRideComponent,
    SearchResultComponent,
    PaginationComponent,
    TruncatePipe,
    SearchComponent,
    MyRidesComponent,
    TripComponent,
    TripCardComponent,
    PhoneNumberComponent,
    CodeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    MatMenuModule,
    MatDatepickerModule,
    FormsModule,
    MatCardModule,
    MatNativeDateModule,
    HttpClientModule,
    MatExpansionModule,
    NgOtpInputModule,
    NgxMaskModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: false}),
    EffectsModule.forRoot([RoutesEffects]),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
