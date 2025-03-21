import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [RouterLink]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
