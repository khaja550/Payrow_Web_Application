import { CatMobileComponent } from './cat-mobile/cat-mobile.component';
import { PrinterComponent } from './printer/printer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PayrowPartnersComponent } from './payrow-partners/payrow-partners.component';
import { HardwareMenuComponent } from './hardware-menu/hardware-menu.component';
import { MobileComponent } from './mobile/mobile.component';
import { CashMachineComponent } from './cash-machine/cash-machine.component';
import { PosComponent } from './pos/pos.component';
import { SmallPrinterComponent } from './small-printer/small-printer.component';
import { RetailMachineComponent } from './retail-machine/retail-machine.component';
import { SoftwareProductComponent } from './software-product/software-product.component';
import { BnplComponent } from './bnpl/bnpl.component';
import { PaymentgatewayComponent } from './paymentgateway/paymentgateway.component';
import { VatComponent } from './vat/vat.component';
import { WpsComponent } from './wps/wps.component';
import { SoftposComponent } from './softpos/softpos.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { BlogComponent } from './blog/blog.component';
import { EkycComponent } from './ekyc/ekyc.component';
import { SunmiMobileComponent } from './sunmi-mobile/sunmi-mobile.component';

const routes: Routes = [
  // { path: "", component: HomeComponent },
  { path: 'aboutus', component: AboutComponent },
  { path: 'globalpartners', component: PayrowPartnersComponent },
  { path: 'mobiles', component: MobileComponent },
  { path: 'cashmachine', component: CashMachineComponent },
  { path: 'pos', component: PosComponent },
  { path: 'printer', component: PrinterComponent },
  { path: 'printer/k419', component: SmallPrinterComponent },
  { path: 'retailmachine', component: RetailMachineComponent },
  { path: 'kyc', component: SoftwareProductComponent },
  { path: 'bnpl', component: BnplComponent },
  { path: 'paymentgateway', component: PaymentgatewayComponent },
  { path: 'vat', component: VatComponent },
  { path: 'wps', component: WpsComponent },
  { path: 'softpos', component: SoftposComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'ekyc', component: EkycComponent },
  { path: 'submiMobile', component: SunmiMobileComponent },
  { path: 'catmobile', component: CatMobileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingpageRoutingModule {}
