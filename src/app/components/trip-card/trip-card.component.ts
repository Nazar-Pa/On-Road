import { Component, Input, OnInit } from '@angular/core';
import { Trip } from 'src/shared/interfaces';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss']
})
export class TripCardComponent implements OnInit {
    @Input() trip!: Trip;

  constructor() { }

  ngOnInit(): void {
  }

}
