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
import { SignaturesComponent } from "./dashboard/components/signatures/signatures.component";
import { SignatureComponent } from "./dashboard/components/signatures/components/signature/signature.component";
import { ProgramsComponent } from "./dashboard/components/programs/programs.component";
import { ContractDetailComponent } from "./dashboard/components/programs/components/contract-detail/contract-detail.component";
import { BookmarksComponent } from "./dashboard/components/bookmarks/bookmarks.component";
import { PaymentsComponent } from "./dashboard/components/payments/payments.component";

//public
import { LandingComponent } from './landing/landing.component';
import { PublicComponent } from './public/public.component';
import { PagesComponent } from './public/components/pages/pages.component';
import { ProgramListComponent } from "./public/components/program-list/program-list.component";
import { ProgramComponent } from "./public/components/program/program.component";
import { ContractComponent } from "./public/components/contract/contract.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReportComponent } from "./report/report.component";

//payment
import { PaymentComponent } from "./payment/payment.component";
import { SuccessComponent } from "./payment/components/success/success.component";
import { FailureComponent } from "./payment/components/failure/failure.component";
import { CheckoutComponent } from "./payment/components/checkout/checkout.component";

const routes: Routes = [
  {
    path: '', component: PublicComponent,
    children: [
      { path: '', redirectTo: '/programs', pathMatch: 'full' },
      //{ path: '', component: ProgramListComponent },
      { path: 'program/:id/:slug', component: ProgramComponent },
      { path: 'page/:section', component: PagesComponent },
      { path: 'programs', component: ProgramListComponent },
      { path: 'contract/:intakeId/:id/:slug', component: ContractComponent }
    ]
  },
  { path: 'landing', component: LandingComponent },
  { path: 'login', redirectTo: '/account/login' },
  { path: 'register', redirectTo: '/account/signup' },
  {
    path: 'payment', component: PaymentComponent,
    children: [
      { path: 'checkout', component: CheckoutComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'failure', component: FailureComponent }
    ]
  },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: 'signatures', component: SignaturesComponent,
        children: [
          { path: 'new', component: SignatureComponent },
        ]
      },
      {
        path: 'programs', component: ProgramsComponent,
        children: [
          { path: 'contract-detail/:id', component: ContractDetailComponent },
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
