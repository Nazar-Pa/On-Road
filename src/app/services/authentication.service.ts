import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { BehaviorSubject, from, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);
  newRoute$ = false;
  searchIcon2$ = true;
  currentUrl$ = '';
  // private url = new BehaviorSubject('');
  // currentUrl = this.url.asObservable();

  private name = new BehaviorSubject('');
  userName = this.name.asObservable();

  private newAdd = new BehaviorSubject(false);
  driverNewAdd = this.newAdd.asObservable();

  private searchIcon = new BehaviorSubject(true);
  showSearchIcon = this.searchIcon.asObservable();

  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user_data') as string);
  //   console.log(user);
  //   return user !== null ? true : false;
  // }

  constructor(public afAuth: AngularFireAuth, private auth: Auth) { }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password))
  }

  signUp(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)
    )
    // .pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })
    // ));
  }

  logout() {
    return from(this.afAuth.signOut());
  }

  // getUrl(url: string) {
  //   this.url.next(url);
  // }

  getName(name: string) {
    this.name.next(name)
  }

  getNewAdd(newAdd: boolean) {
    this.newAdd.next(newAdd)
  }

  getSearchIcon(searchIcon: boolean){
    this.searchIcon.next(searchIcon);
  }
}
