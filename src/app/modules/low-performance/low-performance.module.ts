import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { LowPerformanceComponent } from './low-performance.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common'
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  	{ path: '', component: LowPerformanceComponent, canActivate: [AuthGuard] },
];

@NgModule({
	declarations: [LowPerformanceComponent],
	imports: [
		HttpClientModule,
		CommonModule,
		Ng2SearchPipeModule,
        FormsModule,ReactiveFormsModule,
		RouterModule.forChild(routes)
	]
})
export class LowPerformanceModule { }
