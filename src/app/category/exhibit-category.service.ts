import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {ExhibitCategory} from './exhibit-category.model';

@Injectable({
  providedIn: 'root'
})
export class ExhibitCategoryService {

  private exhibitCategoryList: ExhibitCategory[] = [
    {id: 1, name: 'Jersey'},
    {id: 2, name: 'Ring'},
    {id: 3, name: 'Ball'},
    {id: 4, name: 'Shoes'},
    {id: 5, name: 'Photos'},
  ];

  constructor() { }

  getAll(): Observable<any> {
    return of(this.exhibitCategoryList);
  }

}
