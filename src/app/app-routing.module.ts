import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { EmailAuthComponent } from './components/email-auth/email-auth.component';
import { PublishRideComponent } from './components/publish-ride/publish-ride.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchComponent } from './components/search/search.component';
import { MyRidesComponent } from './components/my-rides/my-rides.component';
import { TripComponent } from './components/trip/trip.component';

const redirecToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['publish-ride']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'email-auth',
    component: EmailAuthComponent,
  },
  {
    path: 'publish-ride',
    component: PublishRideComponent,
    ...canActivate(redirecToLogin)
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'search-result',
    component: SearchResultComponent
  },
  {
    path: 'rides',
    component: MyRidesComponent,
    ...canActivate(redirecToLogin)
  },
  {
    path: 'trip',
    component: TripComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
