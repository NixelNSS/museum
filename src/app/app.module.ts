import { CountryService } from './shared/country/country.service';
import { SettingCategoryService } from 'src/app/category/setting-category.service';
import { ReviewService } from './shared/review/review.service';
import { PlanerService } from './planer/planer.service';
import { PlanerComponent } from './planer/planer/planer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MaterialModule } from './material.module';
import { ProfileComponent } from './auth/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { PersonalInformationComponent } from './auth/profile/personal-information/personal-information.component';
import { PasswordComponent } from './auth/profile/password/password.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { TokenStorageService } from './auth/token-storage.service';
import { SettingDetailsComponent } from './setting/setting-details/setting-details.component';
import { TourPlanComponent } from './tour-plan/tour-plan/tour-plan.component';
import { TourPlanService } from './tour-plan/tour-plan.service';
import { SettingService } from './setting/setting.service';
import { BarRatingModule } from "ngx-bar-rating";
import { NgxPaginationModule } from 'ngx-pagination';
import { ExhibitComponent } from './exhibit/exhibit/exhibit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    NavbarComponent,
    PersonalInformationComponent,
    PasswordComponent,
    ConfirmationDialogComponent,
    PageNotFoundComponent,
    SettingDetailsComponent,
    TourPlanComponent,
    PlanerComponent,
    ExhibitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BarRatingModule,
    NgxPaginationModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-left',
        closeButton: true,
      }
    )
  ],
  providers: [
    AuthService,
    AuthGuardService,
    TokenStorageService,
    SettingService,
    TourPlanService,
    PlanerService,
    ReviewService,
    SettingCategoryService,
    CountryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
