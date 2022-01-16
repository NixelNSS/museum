import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TourPlanService } from '../tour-plan/tour-plan.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private tourPlanService: TourPlanService) {}

  getCount() {
    if (this.tourPlanService.tourPlanList)
      return this.tourPlanService.tourPlanList.length;
    else
      return 0;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

}
