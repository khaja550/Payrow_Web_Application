import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CreateAccountComponent } from './create-account.component';
import { CreateAcMenusComponent } from './create-ac-menus/create-ac-menus.component';
import { AcUserComponent } from './ac-user/ac-user.component';
import { PersonalComponent } from './reuseble-forms/personal/personal.component';
import { CardFormComponent } from './reuseble-forms/card-form/card-form.component';
import { BankFormComponent } from './reuseble-forms/bank-form/bank-form.component';
import { AddressFormComponent } from './reuseble-forms/address-form/address-form.component';
import { StaffFormComponent } from './reuseble-forms/staff-form/staff-form.component';
import { LicenceFormComponent } from './reuseble-forms/licence-form/licence-form.component';
import { BusinessFormComponent } from './reuseble-forms/business-form/business-form.component';
import { NbqFormComponent } from './reuseble-forms/nbq-form/nbq-form.component'
import { NiFormComponent } from './reuseble-forms/ni-form/ni-form.component'
import { HttpClientModule } from '@angular/common/http';
import { DistributorComponent } from './distributor/distributor.component';
import { PgMerchantsComponent } from './pg-merchants/pg-merchants.component';
import { MidReqFormComponent } from './reuseble-forms/mid-req-form/mid-req-form.component';
const routes: Routes = [
  { path: '', component: CreateAccountComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  // { path: 'distributor', component: DistributorComponent },
  { path: 'ac-user', component: AcUserComponent },
  // { path: 'ac-bank', component: AcBankComponent },
  {path:'pgMerchants',component:PgMerchantsComponent}
];

@NgModule({
  declarations: [CreateAccountComponent, CreateAcMenusComponent, NiFormComponent, AcUserComponent, PersonalComponent, CardFormComponent, BankFormComponent, AddressFormComponent, StaffFormComponent, LicenceFormComponent, BusinessFormComponent, NbqFormComponent, DistributorComponent, PgMerchantsComponent, MidReqFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgMultiSelectDropDownModule,
    RouterModule.forChild(routes)
  ]
})
export class CreateAccountModule { }
