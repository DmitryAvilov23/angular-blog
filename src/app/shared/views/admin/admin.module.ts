import { SearchPostsPipe } from './shared/pipes/search-posts.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../shared.module';

import { AuthGuard } from './shared/guards/auth.guard';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { AlertComponent } from 'src/app/shared/views/admin/shared/components/alert/alert.component';

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
    SearchPostsPipe,
    AlertComponent,
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
  providers: [AuthGuard],
})
export class AdminModule {}
