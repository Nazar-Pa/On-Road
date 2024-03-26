import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  // private apiUrl = environment.API_BASE_URL
  private apiUrl = 'http://localhost:2000'

  constructor(private http: HttpClient) { }

  getSingleTripOfDriver(filterField: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/trips/new-trip?route_id=${filterField.routeId}`)
  }

  deleteTrip(routeId: number): Observable<any> {
    const url = `${this.apiUrl}/routes/${routeId}`;
    return this.http.delete<any>(url);
  }

  createRoute(route: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, route, httpOptions)
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/user`, user, httpOptions)
  }

  getAllRoutes(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  getFilteredRoutes(filterField: any): Observable<any> {
    const date = new Date(filterField.date)
    return this.http.get<any>(`${this.apiUrl}/routes/search?from=${filterField.from}&to=${filterField.to}&date=${date.toLocaleDateString()}&numbOfPass=${filterField.numbOfPass}`, filterField)
  }

  getAllTripsOfDriver(uid: string | undefined): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/routes/${uid}`)
  }

  filteredRoutes(routes: any) {
    this.routes.next(routes);
  }

  getSearchFields(searchParams: any) {
    this.searchParams.next(searchParams);
  }
}
