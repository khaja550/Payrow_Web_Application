import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TopCustomersComponent } from './top-customers.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';


const routes: Routes = [
  { path: '', component: TopCustomersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [TopCustomersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TopCustomersModule { }
