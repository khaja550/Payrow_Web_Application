import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesPersonsComponent } from './sales-persons.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


const routes: Routes = [
    { path: '', component: SalesPersonsComponent, canActivate: [AuthGuard] },
  ];

@NgModule({
  declarations: [SalesPersonsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes)
  ]
})
export class SalesPersonsModule { }
