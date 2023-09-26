import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceCatalogueComponent } from './service-catalogue.component';

const routes: Routes = [
  { path: '', component: ServiceCatalogueComponent, canActivate: [AuthGuard],pathMatch:'full' },
];

@NgModule({
  declarations: [ServiceCatalogueComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ServiceCatalogueModule { }
