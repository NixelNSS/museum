import { User } from './user/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { SettingCategory } from '../category/setting-category.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [
    {
      id: 1, email: 'nikola@nikola.com', password: 'nikola1234',
      firstName: 'Nikola', lastName: 'Kostic', phone: '+381663234554',
      address: 'Street of success', favoriteCategories: [
        {id: 1, name: 'Boston Celtics'},
        {id: 3, name: 'Detroit Pistons'},
        {id: 5, name: 'New York Knicks'}
      ]
    },
    {
      id: 2, email: 'zoran@zoran.com', password: 'zoran1234',
      firstName: 'Zoran', lastName: 'Zoric', phone: '+381663222554',
      address: 'Street of basketball', favoriteCategories: [
        {id: 1, name: 'Boston Celtics'},
        {id: 4, name: 'Golden State Warriors'},
        {id: 5, name: 'New York Knicks'}
      ]
    },
    {
      id: 3, email: 'milan@milan.com', password: 'milan1234',
      firstName: 'Milan', lastName: 'Milanovic', phone: '+381663211154',
      address: 'Street of museum', favoriteCategories: [
        {id: 2, name: 'Los Angeles Lakers'},
        {id: 4, name: 'Golden State Warriors'}
      ]
    }
  ];
  private idCounter = 2;

  currentUser: User = null;

  constructor(
    private router: Router, private tokenStorageService: TokenStorageService) { }

  login(email: string, password: string): Observable<any> {
    return of(this.users.find(user => user.email === email && user.password === password));
  }

  logout(): void {
    this.tokenStorageService.logout();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  register(email: string, password: string, confirmPassword: string, firstName: string, lastName: string, phone: string, address: string, favoriteCategories: SettingCategory[]): Observable<User> {
    const createdUser: User = { id: this.idCounter++, email: email, password: password, firstName: firstName, lastName: lastName, phone: phone, address: address, favoriteCategories: favoriteCategories };
    this.users.push(createdUser);
    return of(createdUser);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    if (oldPassword !== this.currentUser.password)
      return throwError("Old password doesn't match!");
    const index = this.users.indexOf(this.currentUser);
    this.currentUser.password = newPassword;
    this.users[index] = this.currentUser;
    return of(this.currentUser);
  }

  getCurrentUserDisplayName(): string {
    return this.currentUser.firstName + " " + this.currentUser.lastName;
  }

  update(firstName: string, lastName: string, phone: string, address: string, favoriteCategories: SettingCategory[]): Observable<any> {
    const index = this.users.indexOf(this.currentUser);
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
    this.currentUser.phone = phone;
    this.currentUser.address = address;
    this.currentUser.favoriteCategories = favoriteCategories;
    this.users[index] = this.currentUser;
    return of(this.currentUser);
  }

  updateCurrentUserAfterPersonalInformationUpdate(user: User): void {
    this.tokenStorageService.saveUser(user);
    this.currentUser = this.tokenStorageService.getUser();
  }

  updateCurrentUser(): void {
    const user = this.tokenStorageService.getUser();
    if (user != null) {
      this.currentUser = user;
    }
  }

  updateCurrentUserAfterAuth(response: any): void {
    let user: User = {
      id: response.id,
      email: response.email,
      password: response.password,
      firstName: response.firstName,
      lastName: response.lastName,
      phone: response.phone,
      address: response.address,
      favoriteCategories: response.favoriteCategories
    };
    this.tokenStorageService.saveUser(user);
    this.currentUser = this.tokenStorageService.getUser();
  }

}
