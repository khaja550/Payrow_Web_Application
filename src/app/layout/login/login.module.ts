import { UsersService } from './../../data/services/users.service';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';


const routes = [
  { path: 'login', component: LoginComponent },
];

// const routes: Routes = [
//   {
//     path: '',
//     component: LoginComponent,
//     canActivate: [AuthGuard],
//     pathMatch: 'full',
//   },
//   { path: 'login', component: LoginComponent },
//   { path: 'aboutus', component: AboutusComponent },
//   { path: 'aboutus', component: AboutusComponent }
// ];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    UsersService
  ]
})
export class LoginModule { }
