import { TourPlanService } from '../tour-plan.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import {Exhibit} from '../../exhibit/exhibit.model';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tour-plan',
  templateUrl: './tour-plan.component.html',
  styleUrls: ['./tour-plan.component.css']
})
export class TourPlanComponent implements OnInit {

  dataSource: MatTableDataSource<Exhibit> = new MatTableDataSource<Exhibit>();
  displayedColumns: string[] = ["number", "name", "remove"];

  constructor(
    private tourPlanService: TourPlanService,
    private toastService: ToastrService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.data = this.tourPlanService.tourPlanList;
  }

  create(): void {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        content: "create a tour plan"
      }
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.tourPlanService.create().subscribe(
          response => {
            this.toastService.success("Thank you for creating a tour plan.");
            this.tourPlanService.tourPlanList = response;
            this.dataSource.data = this.tourPlanService.tourPlanList;
            this.router.navigate(['']);
          }
        );
      }
    });
  }

  removeExhibit(exhibitId: number): void {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        content: "remove this exhibit from the current tour plan"
      }
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.tourPlanService.removeExhibit(exhibitId).subscribe(
          response => {
            this.tourPlanService.tourPlanList = response;
            this.dataSource.data = this.tourPlanService.tourPlanList;
            this.toastService.success("Exhibit removed.");
          }
        );
      }
    });
  }

}
