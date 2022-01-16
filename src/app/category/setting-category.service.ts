import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {SettingCategory} from './setting-category.model';

@Injectable({
  providedIn: 'root'
})
export class SettingCategoryService {

  private settingCategoryList: SettingCategory[] = [
    {id: 1, name: 'Boston Celtics'},
    {id: 2, name: 'Los Angeles Lakers'},
    {id: 3, name: 'Detroit Pistons'},
    {id: 4, name: 'Golden State Warriors'},
    {id: 5, name: 'New York Knicks'}
  ];

  constructor() { }

  getAll(): Observable<any> {
    return of(this.settingCategoryList);
  }

}
