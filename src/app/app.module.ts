import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/components/login/login.component';
import { RegisterComponent } from './account/components/register/register.component';
import { ForgotComponent } from './account/components/forgot/forgot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PasswordComponent } from './account/components/password/password.component';
import { ContractsComponent } from './dashboard/components/contracts/contracts.component';
import { SignaturesComponent } from './dashboard/components/signatures/signatures.component';
import { BookmarksComponent } from './dashboard/components/bookmarks/bookmarks.component';
import { PaymentsComponent } from './dashboard/components/payments/payments.component';
import { SearchComponent } from './search/search.component';
import { ContractComponent } from './contract/contract.component';
import { ReportComponent } from './report/report.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StartContractComponent } from './dashboard/components/contracts/components/start-contract/start-contract.component';
import { UpdateContractComponent } from './dashboard/components/contracts/components/update-contract/update-contract.component';
import { BoolPipe } from './pipes/bool.pipe';
import { ContractTypePipe } from './pipes/contract-type.pipe';
import { SignatureComponent } from './dashboard/components/signatures/components/signature/signature.component';
import { ConfirmComponent } from './dashboard/components/confirm/confirm.component';
import { ReservedComponent } from './dashboard/components/reserved/reserved.component';
import { StatusPipe } from './pipes/status.pipe';
import { HomeComponent } from './home/home.component';

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
    SignaturesComponent,
    BookmarksComponent,
    PaymentsComponent,
    SearchComponent,
    ContractComponent,
    ReportComponent,
    ContractListComponent,
    PageNotFoundComponent,
    StartContractComponent,
    UpdateContractComponent,
    BoolPipe,
    ContractTypePipe,
    SignatureComponent,
    ConfirmComponent,
    ReservedComponent,
    StatusPipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
