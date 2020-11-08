import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LandingComponent } from './landing/landing.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { FooterComponent } from './footer/footer.component';

import { PublicComponent } from './public/public.component';
import { ProgramComponent } from './public/components/program/program.component';
import { ProgramListComponent } from './public/components/program-list/program-list.component';
import { ContractComponent } from './public/components/contract/contract.component';
import { AgentsComponent } from './public/components/agents/agents.component';
import { PagesComponent } from './public/components/pages/pages.component';

import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/components/login/login.component';
import { RegisterComponent } from './account/components/register/register.component';
import { ForgotComponent } from './account/components/forgot/forgot.component';
import { PasswordComponent } from './account/components/password/password.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgramsComponent } from './dashboard/components/programs/programs.component';
import { ContractDetailComponent } from './dashboard/components/programs/components/contract-detail/contract-detail.component';
import { SignaturesComponent } from './dashboard/components/signatures/signatures.component';
import { BookmarksComponent } from './dashboard/components/bookmarks/bookmarks.component';
import { PaymentsComponent } from './dashboard/components/payments/payments.component';
import { SignatureComponent } from './dashboard/components/signatures/components/signature/signature.component';

import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './payment/components/success/success.component';
import { FailureComponent } from './payment/components/failure/failure.component';
import { CheckoutComponent } from './payment/components/checkout/checkout.component';

import { ReportComponent } from './report/report.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { BoolPipe } from './pipes/bool.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { DegreePipe } from './pipes/degree.pipe';
import { TypePipe } from './pipes/type.pipe';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    DashboardComponent,
    PasswordComponent,
    SignaturesComponent,
    BookmarksComponent,
    PaymentsComponent,
    ProgramComponent,
    ReportComponent,
    ProgramListComponent,
    ContractComponent,
    PageNotFoundComponent,
    BoolPipe,
    StatusPipe,
    LandingComponent,
    PagesComponent,
    NavigatorComponent,
    PublicComponent,
    FilterPipe,
    DegreePipe,
    TypePipe,
    PaymentComponent,
    SuccessComponent,
    FailureComponent,
    CheckoutComponent,
    ProgramsComponent,
    SafePipe,
    SignatureComponent,
    ContractDetailComponent,
    AgentsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
