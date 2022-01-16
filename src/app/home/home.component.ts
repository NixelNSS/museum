import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingCategory } from '../category/setting-category.model';
import { SettingCategoryService } from '../category/setting-category.service';
import { Setting } from '../setting/setting.model';
import { SettingService } from '../setting/setting.service';
import { TourPlanService } from '../tour-plan/tour-plan.service';
import { ExhibitCategoryService } from '../category/exhibit-category.service';
import { User } from '../auth/user/user.model';
import {ExhibitCategory} from '../category/exhibit-category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  settings: Setting[] = [];
  searchValue: string = "";

  settingCategories = new FormControl();
  settingCategoryList: SettingCategory[];
  exhibitCategories = new FormControl();
  exhibitCategoryList: ExhibitCategory[];
  maximumPrice = new FormControl();
  rating = new FormControl();
  numberOfExhibits = new FormControl();
  minimalTourTime = new FormControl();

  currentUser: User = this.authService.currentUser;

  page = 1;
  totalItemsNumber= this.settings.length;

  constructor(
    private settingService: SettingService,
    private router: Router,
    private tourPlanService: TourPlanService,
    private toastService: ToastrService,
    private settingCategoryService: SettingCategoryService,
    private exhibitCategoryService: ExhibitCategoryService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.settingService.getAll().subscribe(response => this.settings = response);
    this.settingCategoryService.getAll().subscribe(response => this.settingCategoryList = response);
    this.exhibitCategoryService.getAll().subscribe(response => this.exhibitCategoryList = response);
  }

  loadDetails(settingId: number) {
    this.router.navigate(['setting/details', settingId]);
  }

  search(value: string): void {
    if (value == "")
      this.settingService.getAll().subscribe(response => this.settings = response);
    else
      this.settingService.getBySearchCriteria(value).subscribe(response => this.settings = response);
    this.settingCategories = new FormControl();
    this.exhibitCategories = new FormControl();
    this.maximumPrice = new FormControl();
    this.rating = new FormControl();
    this.numberOfExhibits = new FormControl();
    this.minimalTourTime = new FormControl();
  }

  onSubmit(): void {
    this.searchValue = "";
    this.settingService.getAllByFilters(
      this.settingCategories.value === null ? this.settingCategoryList : this.settingCategories.value,
      this.exhibitCategories.value === null ? this.exhibitCategoryList : this.exhibitCategories.value,
      this.maximumPrice.value === null ? 1000000 : this.maximumPrice.value,
      this.rating.value === null ? 0 : this.rating.value,
      this.numberOfExhibits.value === null ? 1 : this.numberOfExhibits.value,
      this.minimalTourTime.value === null ? 1 : this.minimalTourTime.value
    ).subscribe(response => this.settings = response);
  }

  onTableDataChange(event: number): void {
    this.page = event;
  }

}
