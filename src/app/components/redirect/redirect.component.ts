import { Component, OnInit } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, isSignInWithEmailLink, 
    sendSignInLinkToEmail, signInWithEmailLink } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss'
})
export class RedirectComponent implements OnInit {

    constructor(private auth: Auth) {

    }

    ngOnInit(): void {
        // Confirm the link is a sign-in with email link.
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    var email: string = window.localStorage.getItem('emailForSignIn') as string;
    // if (!email) {
    //   // User opened the link on a different device. To prevent session fixation
    //   // attacks, ask the user to provide the associated email again. For example:
    //   email = window.prompt('Please provide your email for confirmation');
    // }
    // The client SDK will parse the code from the link for you.
    firebase.auth().signInWithEmailLink(email, window.location.href)
      .then((result) => {
        // Clear email from storage.
        console.log(result.user)
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }
    }

}
