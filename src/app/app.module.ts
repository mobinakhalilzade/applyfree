import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/components/login/login.component';
import { RegisterComponent } from './account/components/register/register.component';
import { ForgotComponent } from './account/components/forgot/forgot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PasswordComponent } from './account/components/password/password.component';
import { ContractsComponent } from './dashboard/components/contracts/contracts.component';
import { ContractComponent } from './contract/contract.component';
import { SignaturesComponent } from './dashboard/components/signatures/signatures.component';
import { BookmarksComponent } from './dashboard/components/bookmarks/bookmarks.component';
import { PaymentsComponent } from './dashboard/components/payments/payments.component';
import { SearchComponent } from './search/search.component';
import { ProgramComponent } from './public/components/program/program.component';
import { ReportComponent } from './report/report.component';
import { ProgramListComponent } from './public/components/program-list/program-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StartContractComponent } from './dashboard/components/contracts/components/start-contract/start-contract.component';
import { UpdateContractComponent } from './dashboard/components/contracts/components/update-contract/update-contract.component';
import { BoolPipe } from './pipes/bool.pipe';
import { ContractTypePipe } from './pipes/contract-type.pipe';
import { SignatureComponent } from './dashboard/components/signatures/components/signature/signature.component';
import { ConfirmComponent } from './dashboard/components/confirm/confirm.component';
import { ReservedComponent } from './dashboard/components/reserved/reserved.component';
import { StatusPipe } from './pipes/status.pipe';
import { LandingComponent } from './landing/landing.component';
import { ContractFilterPipe } from './pipes/contract-filter.pipe';
import { PagesComponent } from './public/components/pages/pages.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { PublicComponent } from './public/public.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DegreePipe } from './pipes/degree.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SchoolComponent } from './public/components/school/school.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    DashboardComponent,
    PasswordComponent,
    ContractsComponent,
    ContractComponent,
    SignaturesComponent,
    BookmarksComponent,
    PaymentsComponent,
    SearchComponent,
    ProgramComponent,
    ReportComponent,
    ProgramListComponent,
    PageNotFoundComponent,
    StartContractComponent,
    UpdateContractComponent,
    BoolPipe,
    ContractTypePipe,
    SignatureComponent,
    ConfirmComponent,
    ReservedComponent,
    StatusPipe,
    LandingComponent,
    PagesComponent,
    ContractFilterPipe,
    NavigatorComponent,
    PublicComponent,
    FilterPipe,
    DegreePipe,
    SchoolComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
