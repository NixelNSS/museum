import {Observable, of} from 'rxjs';
import { Injectable } from '@angular/core';
import {Country} from './country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countryList: Country[] = [
    {id: 1, name: 'Massachusetts'},
    {id: 2, name: 'Illinois'},
    {id: 3, name: 'Michigan'},
    {id: 4, name: 'New York'},
    {id: 5, name: 'Arizona'}
  ];

  constructor() { }

  getAll(): Observable<any> {
    return of(this.countryList);
  }

}
