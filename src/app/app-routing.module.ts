import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { LoginComponent } from './layout/login/login.component';
import { ErrorComponent } from './modules/errors/error.component';
import { QrCodeComponent } from './qr-code/qr-code.component';


const routes: Routes = [{
    path: '', component: LoginComponent
}, {
    path: 'login', component: LoginComponent
},
{
    path: 'qrCode/:id', component: QrCodeComponent
},


{
    path: '',
    component: DefaultComponent,
    children: [
        {
            path: 'dashboard',
            loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
        }, {
            path: 'cash-invoice',
            loadChildren: () => import('./modules/cash-invoice/cash-invoice.module').then(m => m.CashInvoiceModule)
        }, {
            path: 'consolidated',
            loadChildren: () => import('./modules/consolidated/consolidated.module').then(m => m.ConsolidatedModule)
        }, {
            path: 'create-account',
            loadChildren: () => import('./modules/create-account/create-account.module').then(m => m.CreateAccountModule)
        }, {
            path: 'complaints',
            loadChildren: () => import('./modules/complaints/complaints.module').then(m => m.ComplaintsModule)
        },
        {
            path: 'distributor',
            loadChildren: () => import('./modules/distributor/distributor.module').then(m => m.DistributorModule)
        }, {
            path: 'employee-relations',
            loadChildren: () => import('./modules/employee-relations/employee-relations.module').then(m => m.EmployeeRelationsModule)
        }, {
            path: 'expenses',
            loadChildren: () => import('./modules/expenses/expenses.module').then(m => m.ExpensesModule)
        }, {
            path: 'finance',
            loadChildren: () => import('./modules/finance/finance.module').then(m => m.FinanceModule)
        }, {
            path: 'high-consumption',
            loadChildren: () => import('./modules/high-consumption/high-consumption.module').then(m => m.HighConsumptionModule)
        }, {
            path: 'low-performance',
            loadChildren: () => import('./modules/low-performance/low-performance.module').then(m => m.LowPerformanceModule)
        }, {
            path: 'risk',
            loadChildren: () => import('./modules/risk/risk.module').then(m => m.RiskModule)
        }, {
            path: 'tap-to-pay',
            loadChildren: () => import('./modules/tap-to-pay/tap-to-pay.module').then(m => m.TapToPayModule)
        }, {
            path: 'payment-gateway',
            loadChildren: () => import('./modules/payment-gateway/payment-gateway.module').then(m => m.PaymentGatewayModule)
        }, {
            path: 'top-customers',
            loadChildren: () => import('./modules/top-customers/top-customers.module').then(m => m.TopCustomersModule)
        }, {
            path: 'service-catalogue',
            loadChildren: () => import('./modules/service-catalogue/service-catalogue.module').then(m => m.ServiceCatalogueModule)
        }, {
            path: 'referdesign',
            loadChildren: () => import('./modules/referdesign/referdesign.module').then(m => m.ReferDesignModule)
        }, {
            path: 'vat-report',
            loadChildren: () => import('./modules/vat-report/vat-report.module').then(m => m.VatReportModule)
        }, {
            path: 'onboarding',
            loadChildren: () => import('./modules/onboarding/onboarding.module').then(m => m.OnboardingModule)
        }, {
            path: 'acntStatus',
            loadChildren: () => import('./modules/acnt-status/acnt-status.module').then(m => m.AcntStatusModule)
        }, {
            path: 'sales-persons',
            loadChildren: () => import('./modules/sales-persons/sales-persons.module').then(m => m.SalesPersonsModule)
        }, {
            path: 'error',
            component: ErrorComponent
        }
    ]
}];
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
