import { ConfirmationDialogComponent } from './../../../confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth.service';
import { User } from '../../user/user.model';
import { ToastrService } from 'ngx-toastr';
import { SettingCategoryService } from 'src/app/category/setting-category.service';
import { SettingCategory } from 'src/app/category/setting-category.model';

@Component({
  selector: 'personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  isNotEditable: boolean = true;
  currentUser: User = Object.create(this.authService.currentUser);
  categoriesForm = new FormControl({ value: this.findFavoriteCategories(), disabled: true });
  categoryList: string[];
  categoryObjects: SettingCategory[];

  constructor(
    private authService: AuthService, private dialog: MatDialog,
    private toastService: ToastrService, private categoryService: SettingCategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(response => {
      this.categoryObjects = response;
      this.categoryList = this.categoryObjects.map(category => category.name);
    });
  }

  findFavoriteCategories(): string[] {
    return this.currentUser.favoriteCategories.map(category => category.name);
  }

  findCategoryObjects(categoryStrings: string[]): SettingCategory[] {
    let array: SettingCategory[] = [];
    categoryStrings.forEach(string => {
      let object = this.categoryObjects.find(category => category.name === string);
      if (object) array.push(object);
    });
    return array;
  }

  changeEditState(): void {
    this.isNotEditable = !this.isNotEditable;
    this.isNotEditable ? this.categoriesForm.disable() : this.categoriesForm.enable();
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const dialog = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          content: "change your personal information"
        }
      });
      dialog.afterClosed().subscribe(result => {
        if (result) {
          this.authService.update(
            form.value.firstName,
            form.value.lastName,
            form.value.phone,
            form.value.address,
            this.findCategoryObjects(this.categoriesForm.value)
          ).subscribe(
            response => {
              this.changeEditState();
              this.authService.updateCurrentUserAfterPersonalInformationUpdate(response);
              this.currentUser = Object.create(this.authService.currentUser);
              this.toastService.success("Personal information updated successfully!");
            }
          );
        }
      });
    }
  }

}
