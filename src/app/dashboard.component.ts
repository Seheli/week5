import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IT } from './IT';
import { ITService } from './IT.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  IT390: IT[] = [];

  constructor(
    private router: Router,
    private ITService: ITService) {
  }

  ngOnInit(): void {
    this.ITService.getIT390()
      .subscribe(IT390 => this.IT390 = IT390.slice(1, 5));
  }

  gotoDetail(IT: IT): void {
    const link = ['/detail', IT.id];
    this.router.navigate(link);
  }
}
