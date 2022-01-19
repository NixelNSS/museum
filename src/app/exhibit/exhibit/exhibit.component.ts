import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExhibitService} from '../exhibit.service';
import {Exhibit} from '../exhibit.model';
import {TourPlanService} from '../../tour-plan/tour-plan.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-exhibit',
  templateUrl: './exhibit.component.html',
  styleUrls: ['./exhibit.component.css']
})
export class ExhibitComponent implements OnInit {

  displayedColumns: string[] = ["number", "name", "date", "rating"];
  exhibit: Exhibit;
  previousUrl: string;

  constructor(
    private route: ActivatedRoute,
    private exhibitService: ExhibitService,
    private router: Router,
    private tourPlanService: TourPlanService,
    private toastService: ToastrService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = + params['id'];
      if (params['settingId'] && params['settingId'] != 0) {
        this.previousUrl = '/setting/details/' + params['settingId'];
      } else {
        this.previousUrl = '/planer';
      }
      this.exhibitService.getById(id).subscribe(
        response => this.exhibit = response,
        () => this.router.navigate(['/error404']));
    });
  }

  addToTour() {
    this.tourPlanService.addExhibit(this.exhibit.id)
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
