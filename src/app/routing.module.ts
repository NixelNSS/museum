import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { PlanerComponent } from './planer/planer/planer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SettingDetailsComponent } from './setting/setting-details/setting-details.component';
import { TourPlanComponent } from './tour-plan/tour-plan/tour-plan.component';
import {ExhibitComponent} from './exhibit/exhibit/exhibit.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'planer',
    component: PlanerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'setting/details/:id',
    component: SettingDetailsComponent
  },
  {
    path: 'exhibit/:id/:settingId',
    component: ExhibitComponent
  },
  {
    path: 'tour-plan',
    component: TourPlanComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
