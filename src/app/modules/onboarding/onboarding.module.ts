import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingComponent } from './onboarding.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RiskTransactionComponent } from './risk-transaction/risk-transaction.component';
import { AllocationMenusComponent } from './allocation-menus/allocation-menus.component';
import { TidAllocateComponent } from './tid-allocate/tid-allocate.component';
import { PgAuthenticationComponent } from './pg-authentication/pg-authentication.component'
const routes: Routes = [
  { path: '', component: OnboardingComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'tid-allocate', component: TidAllocateComponent },
  { path: 'pgAuthentication', component: PgAuthenticationComponent },
];


@NgModule({
  declarations: [OnboardingComponent, RiskTransactionComponent, AllocationMenusComponent, TidAllocateComponent, PgAuthenticationComponent],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OnboardingModule { }
