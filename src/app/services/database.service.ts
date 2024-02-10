import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private routes = new BehaviorSubject('');
  currentRoutes = this.routes.asObservable();

  private searchParams = new BehaviorSubject('');
  currentSearchParams = this.searchParams.asObservable();

  private apiUrl = 'https://backendbla-bd1898922d5e.herokuapp.com/routes'

  constructor(private http: HttpClient) { }

  getSingleTripOfDriver(filterField: any): Observable<any> {
     const date = filterField.date
    // const time = date.toLocaleTimeString();
    // const [date, time] = filterField.date.split(',');
    // const [month, day, year] = date.split('/');
    // const [hours, minutes] = time.split(':');
    // const timeDetails = { month, day, year, hours, minutes }
    return this.http.get<any>(`https://backendbla-bd1898922d5e.herokuapp.com/trips/new-trip?route_id=${filterField.routeId}`)
  }

  deleteTrip(routeId: number): Observable<any> {
    const url = `${this.apiUrl}/${routeId}`;
    return this.http.delete<any>(url);
  }

  createRoute(route: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, route, httpOptions)
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`https://backendbla-bd1898922d5e.herokuapp.com/users/user`, user, httpOptions)
  }

  getAllRoutes(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  getFilteredRoutes(filterField: any): Observable<any> {
    const date = new Date(filterField.date)
    return this.http.get<any>(`${this.apiUrl}/search?from=${filterField.from}&to=${filterField.to}&date=${date.toLocaleDateString()}&numbOfPass=${filterField.numbOfPass}`, filterField)
  }

  getAllTripsOfDriver(uid: string | undefined): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${uid}`)
  }

  filteredRoutes(routes: any) {
    this.routes.next(routes);
  }

  getSearchFields(searchParams: any) {
    this.searchParams.next(searchParams);
  }
}
