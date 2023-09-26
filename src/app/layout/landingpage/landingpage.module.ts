import { SoftwareMenuComponent } from './software-menu/software-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingpageRoutingModule } from './landingpage-routing.module';
import { AboutComponent } from './about/about.component';
import { AppMenuComponent } from '../app-menu/app-menu.component';
import { PayrowPartnersComponent } from './payrow-partners/payrow-partners.component';
import { HardwareMenuComponent } from './hardware-menu/hardware-menu.component';
import { HardwareProductComponent } from './hardware-product/hardware-product.component';
// import { SoftwareMenuComponent } from './sunmi-mobile/software-menu/software-menu.component';
import { SoftwareProductComponent } from './software-product/software-product.component';
import { MobileComponent } from './mobile/mobile.component';
import { CashMachineComponent } from './cash-machine/cash-machine.component';
import { PosComponent } from './pos/pos.component';
import { PrinterComponent } from './printer/printer.component';
import { SmallPrinterComponent } from './small-printer/small-printer.component';
import { RetailMachineComponent } from './retail-machine/retail-machine.component';
import { BnplComponent } from './bnpl/bnpl.component';
import { PaymentgatewayComponent } from './paymentgateway/paymentgateway.component';
import { VatComponent } from './vat/vat.component';
import { WpsComponent } from './wps/wps.component';
import { SoftposComponent } from './softpos/softpos.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppSliderComponent } from './app-slider/app-slider.component';
// import { AnimatedComponent } from './animated/animated.component';
import { SuccessTeamComponent } from './about/success-team/success-team.component';
import { AppBoardMemberComponent } from './about/app-board-member/app-board-member.component';
import { PartnersReviewComponent } from './payrow-partners/partners-review/partners-review.component';
import { ClientsComponent } from './payrow-partners/clients/clients.component';
import { ClientReviewComponent } from './payrow-partners/client-review/client-review.component';
import { VatFlowComponent } from './vat/vat-flow/vat-flow.component';
import { PaymentcardComponent } from './paymentgateway/paymentcard/paymentcard.component';
import { WpsflowComponent } from './wps/wpsflow/wpsflow.component';
import { BlogComponent } from './blog/blog.component';
import { EkycComponent } from './ekyc/ekyc.component';
import { SocialmediaComponent } from './blog/socialmedia/socialmedia.component';
import { OurMissionComponent } from './about/our-mission/our-mission.component';
import { SunmiMobileComponent } from './sunmi-mobile/sunmi-mobile.component';
import { OurVisionComponent } from './about/our-vision/our-vision.component';
import { SpecificationWizardComponent } from './sunmi-mobile/specification-wizard/specification-wizard.component';
import { DetailsComponent } from './sunmi-mobile/details/details.component';
import { ScrollBgComponent } from './sunmi-mobile/scroll-bg/scroll-bg.component';
import { SpecificationCardsComponent } from './sunmi-mobile/specification-cards/specification-cards.component';
import { CatMobileComponent } from './cat-mobile/cat-mobile.component';
import { CatScrollComponent } from './cat-mobile/cat-scroll/cat-scroll.component';
import { CatSpecificationCardsComponent } from './cat-mobile/cat-specification-cards/cat-specification-cards.component';
import { CatFeaturesComponent } from './cat-mobile/cat-features/cat-features.component';
import { SunmiFeatureComponent } from './sunmi-mobile/sunmi-feature/sunmi-feature.component';
import { SpecificationsComponent } from './mobile/specifications/specifications.component';
import { FaqComponent } from './faq/faq.component';

// import {IvyCarouselModule} from 'angular-responsive-carousel';

@NgModule({
  declarations: [
    AboutComponent,
    PayrowPartnersComponent,
    PayrowPartnersComponent,
    HardwareMenuComponent,
    HardwareProductComponent,
    SoftwareMenuComponent,
    SoftwareProductComponent,
    MobileComponent,
    CashMachineComponent,
    PosComponent,
    PrinterComponent,
    SmallPrinterComponent,
    RetailMachineComponent,
    BnplComponent,
    PaymentgatewayComponent,
    VatComponent,
    WpsComponent,
    SoftposComponent,
    ContactusComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppSliderComponent,
    SuccessTeamComponent,
    AppBoardMemberComponent,
    PartnersReviewComponent,
    ClientsComponent,
    ClientReviewComponent,
    VatFlowComponent,
    PaymentcardComponent,
    WpsflowComponent,
    BlogComponent,
    EkycComponent,
    SocialmediaComponent,
    OurMissionComponent,
    SunmiMobileComponent,
    OurVisionComponent,
    SpecificationWizardComponent,
    DetailsComponent,
    ScrollBgComponent,
    SpecificationCardsComponent,
    CatMobileComponent,
    CatScrollComponent,
    CatSpecificationCardsComponent,
    CatFeaturesComponent,
    SunmiFeatureComponent,
    SpecificationsComponent,
    FaqComponent,
  ],
  imports: [
    CommonModule,
    LandingpageRoutingModule,
    // IvyCarouselModule
  ],
  
})
export class LandingpageModule {}
