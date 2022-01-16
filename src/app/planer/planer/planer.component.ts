import {ReviewService} from './../../shared/review/review.service';
import {ToastrService} from 'ngx-toastr';
import {Component, OnInit, ViewChild} from '@angular/core';
import {PlanerService} from '../planer.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from 'src/app/confirmation-dialog/confirmation-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {BarRating} from 'ngx-bar-rating';
import {TourPlan} from '../../tour-plan/tour-plan.model';


@Component({
  selector: 'app-planer',
  templateUrl: './planer.component.html',
  styleUrls: ['./planer.component.css']
})
export class PlanerComponent implements OnInit {

  settingDisplayedColumns: string[] = ['number', 'name', 'rating', 'exhibit-details'];

  tourPlans: MatTableDataSource<TourPlan>;
  displayedColumns: string[] = ['number', 'amount', 'time', 'exhibits', 'status', 'done', 'cancel', 'remove'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ratings: number[];

  isOpen: number;

  constructor(
    private planerService: PlanerService,
    private toastService: ToastrService,
    private dialog: MatDialog,
    private router: Router,
    private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.isOpen = -1;
    this.planerService.getByUserId().subscribe(response => {
      this.tourPlans = new MatTableDataSource<TourPlan>(response);
      this.tourPlans.paginator = this.paginator;
      this.tourPlans.sort = this.sort;
    });
  }

  deleteById(id: number): void {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        content: 'remove this exhibit from the current tour plan'
      }
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.planerService.deleteById(id).subscribe(response => {
          this.tourPlans = new MatTableDataSource<TourPlan>(response);
          this.tourPlans.paginator = this.paginator;
          this.tourPlans.sort = this.sort;
          this.toastService.success('Exhibit removed.');
        });
      }
    });
  }

  loadDetails(exhibitId: number): void {
    this.router.navigate(['exhibit/', exhibitId, 0]);
  }

  addReview(value: BarRating, exhibitId: number, tourPlanId: number): void {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        content: 'rate this exhibit'
      }
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.reviewService.addReview(value.rate, exhibitId, tourPlanId).subscribe(response => {
          const planer = this.planerService.addReviewToTourPlan(response.value, exhibitId, tourPlanId);
          this.tourPlans = new MatTableDataSource<TourPlan>(planer);
          this.tourPlans.paginator = this.paginator;
          this.tourPlans.sort = this.sort;
          this.toastService.success('Exhibit has been reviewed successfully.');
        });
      }
    });
  }

  markDone(tourPlanId: number): void {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        content: 'mark this tour as done'
      }
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.planerService.markAsDone(tourPlanId).subscribe(response => {
          this.tourPlans = new MatTableDataSource<TourPlan>(response);
          this.tourPlans.paginator = this.paginator;
          this.tourPlans.sort = this.sort;
          this.toastService.success('Tour plan is marked as done.');
        });
      }
    });
  }

  markCanceled(tourPlanId: number): void {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        content: 'mark this tour plan as canceled'
      }
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.planerService.markAsCanceled(tourPlanId).subscribe(response => {
          this.tourPlans = new MatTableDataSource<TourPlan>(response);
          this.tourPlans.paginator = this.paginator;
          this.tourPlans.sort = this.sort;
          this.toastService.success('Tour plan is marked as canceled.');
        });
      }
    });
  }

  areAllReviewed(tourPlanId: number): boolean {
    const tp: TourPlan = this.tourPlans.data.find(tourPlan => tourPlan.id === tourPlanId);
    if (!tp) {
      return false;
    }
    let allAreReviewed: boolean = false;
    tp.exhibits.forEach(e => {
      if (e.tourPlanReviewValue === 0) {
        allAreReviewed = false;
      }
    });
    return allAreReviewed;
  }

  search(value: string): void {
    this.planerService.getAllByCriteria(value).subscribe(response => {
      this.tourPlans = new MatTableDataSource<TourPlan>(response);
      this.tourPlans.paginator = this.paginator;
      this.tourPlans.sort = this.sort;
    });
  }

}
