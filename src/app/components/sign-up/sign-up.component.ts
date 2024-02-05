import { Component, OnInit } from '@angular/core';
import 'firebase/compat/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
