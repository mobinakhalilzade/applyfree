import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//account
import { AccountComponent } from './account/account.component';
import { LoginComponent } from "./account/components/login/login.component";
import { RegisterComponent } from "./account/components/register/register.component";
import { ForgotComponent } from "./account/components/forgot/forgot.component";
import { PasswordComponent } from "./account/components/password/password.component";

//dashboard
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContractsComponent } from "./dashboard/components/contracts/contracts.component";
import { StartContractComponent } from './dashboard/components/contracts/components/start-contract/start-contract.component';
import { UpdateContractComponent } from './dashboard/components/contracts/components/update-contract/update-contract.component';
import { SignaturesComponent } from "./dashboard/components/signatures/signatures.component";
import { SignatureComponent } from './dashboard/components/signatures/components/signature/signature.component';
import { BookmarksComponent } from "./dashboard/components/bookmarks/bookmarks.component";
import { PaymentsComponent } from "./dashboard/components/payments/payments.component";
import { ConfirmComponent } from './dashboard/components/confirm/confirm.component';
import { ReservedComponent } from './dashboard/components/reserved/reserved.component';

//public
import { PublicComponent } from './public/public.component';
import { PagesComponent } from './public/components/pages/pages.component';
import { ProgramListComponent } from "./public/components/program-list/program-list.component";
import { ProgramComponent } from "./public/components/program/program.component";
import { ReportComponent } from "./report/report.component";
import { ContractComponent } from "./contract/contract.component";
import { SearchComponent } from "./search/search.component";

//static pages
import { LandingComponent } from './landing/landing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent,
    children: [
      { path: '', redirectTo: '/programs', pathMatch: 'full' },
      //{ path: '', component: ProgramListComponent },
      { path: 'program/:id', component: ProgramComponent },
      { path: 'page/:section', component: PagesComponent },
      { path: 'programs', component: ProgramListComponent },
    ]
  },
  { path: 'landing', component: LandingComponent },
  { path: 'login', redirectTo: '/account/login' },
  { path: 'register', redirectTo: '/account/signup' },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'reserved', component: ReservedComponent },
      { path: 'confirm/:code', component: ConfirmComponent },
      {
        path: 'contracts', component: ContractsComponent,
        children: [
          { path: 'new', component: StartContractComponent },
          { path: 'modify/:id', component: UpdateContractComponent },
        ]
      },
      {
        path: 'signatures', component: SignaturesComponent,
        children: [
          { path: 'new', component: SignatureComponent },
        ]
      },
      { path: 'bookmarks', component: BookmarksComponent },
      { path: 'payments', component: PaymentsComponent },
    ]
  },
  {
    path: 'account', component: AccountComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: RegisterComponent },
      { path: 'forgot', component: ForgotComponent },
      { path: 'password/:token', component: PasswordComponent },
    ]
  },
  { path: 'contract', component: ContractComponent },
  { path: 'search', component: SearchComponent },
  { path: 'report', component: ReportComponent },

  { path: '**', redirectTo: '/404', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent },

];




@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    anchorScrolling: "enabled",
    urlUpdateStrategy: "eager",
    scrollPositionRestoration: "enabled"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
