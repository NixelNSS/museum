import { AuthService } from './../../auth/auth.service';
import { TourPlanService } from '../../tour-plan/tour-plan.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Setting } from '../setting.model';
import { SettingService } from '../setting.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/auth/user/user.model';

@Component({
  selector: 'app-setting-details',
  templateUrl: './setting-details.component.html',
  styleUrls: ['./setting-details.component.css']
})
export class SettingDetailsComponent implements OnInit {

  displayedColumnsExhibits: string[] = ["number", "name", "rating", "detail", "add"];
  displayedColumns: string[] = ["number", "name", "rating"];
  setting: Setting;

  currentUser: User = this.authService.currentUser;

  constructor(
    private route: ActivatedRoute,
    private settingService: SettingService,
    private router: Router,
    private tourPlanService: TourPlanService,
    private toastService: ToastrService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = + params['id'];
      this.settingService.getById(id).subscribe(
        response => this.setting = response,
        () => this.router.navigate(['/error404']));
    });
    if (!this.authService.currentUser)
      this.displayedColumnsExhibits.pop();
  }

  loadExhibit(exhibitId: number) {
    this.router.navigate(['exhibit/', exhibitId, this.setting.id]);
  }

  addToCurrentTourPlan(exhibitId: number) {
    this.tourPlanService.addExhibit(exhibitId)
      .subscribe(
        tourPlanList => {
          this.tourPlanService.tourPlanList = tourPlanList;
          this.toastService.success("Exhibit added.");
        },
        error => {
          this.toastService.warning(error)
        });
  }

}
