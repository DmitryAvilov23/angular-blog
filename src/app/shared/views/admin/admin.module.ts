import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../shared.module';

import { AuthService } from './../../services/auth.service';

import { AuthGuard } from './../../guards/auth.guard';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';

const adminChildrens = [
  { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
  {
    path: 'post/:id/edit',
    component: EditPageComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    CreatePageComponent,
    DashboardPageComponent,
    EditPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: adminChildrens,
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard],
})
export class AdminModule {}
