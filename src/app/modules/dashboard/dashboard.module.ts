import { NgModule } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MarketTodayComponent } from './market-today/market-today.component';

import { ChartAllModule, 
        ColumnSeriesService,
        CategoryService,
        AccumulationChartAllModule, PieSeriesService,
        RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxModule,UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DashboardMenusComponent } from './dashboard-menus/dashboard-menus.component';
import { ServiceTypesComponent } from './service-types/service-types.component';
import { CommonModule } from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DashboardFooterGraphsComponent } from './dashboard-footer-graphs/dashboard-footer-graphs.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {ShortNumbersPipe} from './short-numbers.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from '@angular/common/http';
import { TapToPayComponent } from './tap-to-pay/tap-to-pay.component';
import { CashInvoiceComponent } from './cash-invoice/cash-invoice.component';''
const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard],pathMatch: 'full'},
  {path:'market-today', component: MarketTodayComponent},
  {path:'service-types', component:ServiceTypesComponent},
  {path:'tap-to-pay', component:TapToPayComponent},
  {path:'cash-invoice', component:CashInvoiceComponent},
  {path:'expenses', component:DashboardComponent}
];

@NgModule({
  declarations: [DashboardComponent,MarketTodayComponent, DashboardMenusComponent, ServiceTypesComponent, DashboardFooterGraphsComponent, BarChartComponent,ShortNumbersPipe, TapToPayComponent, CashInvoiceComponent],
  imports: [
    CommonModule,
     
    RouterModule.forChild(routes),
    ChartAllModule,
    RangeNavigatorAllModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    DropDownListAllModule,
    DatePickerModule,
    NumericTextBoxModule,
    UploaderModule,
    ButtonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    SharedModule,
    HttpClientModule,
  ],
  providers:[ColumnSeriesService,CategoryService,PieSeriesService]
})
export class DashboardModule { }
