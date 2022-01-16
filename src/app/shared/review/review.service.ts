import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {Review} from './review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviewList: Review[] = [
    {
      id: 1,
      value : 4,
      exhibitId : 1,
      tourPlanId : 1,
      user: {
        id: 1, email: 'nikola@nikola.com', password: 'nikola1234',
        firstName: 'Nikola', lastName: 'Kostic', phone: '+381663234554',
        address: 'Street of success', favoriteCategories: [
          {id: 1, name: 'Boston Celtics'},
          {id: 3, name: 'Detroit Pistons'},
          {id: 5, name: 'New York Knicks'}
        ]
      },
      dateOfCreation: new Date('2022-01-03')
    },
    {
      id: 2,
      value : 2,
      exhibitId : 1,
      tourPlanId : 2,
      user: {
        id: 1, email: 'nikola@nikola.com', password: 'nikola1234',
        firstName: 'Nikola', lastName: 'Kostic', phone: '+381663234554',
        address: 'Street of success', favoriteCategories: [
          {id: 1, name: 'Boston Celtics'},
          {id: 3, name: 'Detroit Pistons'},
          {id: 5, name: 'New York Knicks'}
        ]
      },
      dateOfCreation: new Date('2022-01-04')
    },
    {
      id: 3,
      value : 4,
      exhibitId : 2,
      tourPlanId : 1,
      user: {
        id: 1, email: 'nikola@nikola.com', password: 'nikola1234',
        firstName: 'Nikola', lastName: 'Kostic', phone: '+381663234554',
        address: 'Street of success', favoriteCategories: [
          {id: 1, name: 'Boston Celtics'},
          {id: 3, name: 'Detroit Pistons'},
          {id: 5, name: 'New York Knicks'}
        ]
      },
      dateOfCreation: new Date('2022-01-07')
    },
  ];

  private idCounter: number = 4;

  constructor(private authService: AuthService) { }

  addReview(value: number, exhibitId: number, tourPlanId: number): Observable<any> {
    const review: Review = {
      id: this.idCounter++,
      value: value,
      exhibitId: exhibitId,
      tourPlanId: tourPlanId,
      user: this.authService.currentUser,
      dateOfCreation: new Date()
    };
    this.reviewList.push(review);
    return of(review);
  }

  getByExhibitId(exhibitId: number): Review[] {
    return this.reviewList.filter(r => r.exhibitId === exhibitId);
  }

}
