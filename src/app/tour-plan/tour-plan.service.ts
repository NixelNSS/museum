import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Exhibit} from '../exhibit/exhibit.model';
import {ExhibitService} from '../exhibit/exhibit.service';
import {PlanerService} from '../planer/planer.service';

@Injectable({
  providedIn: 'root'
})
export class TourPlanService {

  tourPlanList: Exhibit[] = [];

  constructor(private exhibitService: ExhibitService,
              private planerService: PlanerService) {}

  addExhibit(exhibitId: number): Observable<any> {
    let exhibit;
    this.exhibitService.getById(exhibitId)
      .subscribe(response => exhibit = response);
    if (this.tourPlanList.includes(exhibit)) {
      return throwError("Exhibit is already added.");
    }
    this.tourPlanList.push(exhibit);
    return of(this.tourPlanList);
  }

  removeExhibit(exhibitId: number): Observable<any> {
    this.exhibitService.getById(exhibitId)
      .subscribe(response => {
        let index = this.tourPlanList.indexOf(response);
        while (index > -1) {
          this.tourPlanList.splice(index, 1);
          index = this.tourPlanList.indexOf(response);
        }
      });
    return of(this.tourPlanList);
  }

  create(): Observable<any> {
    this.planerService.create(this.tourPlanList);
    return of([]);
  }

}
