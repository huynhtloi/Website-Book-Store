import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// receive data from form in angular with ReactiveFormsModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

import { BookService } from './services/book.service';
import { AuthorService } from './services/author.service';
import { ProviderService } from './services/provider.service';
import { PublisherService } from './services/publisher.service';
import { UserService } from './services/user.service';

import { DivideArrayDataPipe } from './pipes/divide-array-data.pipe';
import { SumPipe } from './pipes/sum.pipe';
import { FormatNamePipe } from './pipes/format-name.pipe';

import { appRouter } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { TopMenuCComponent } from './components/top-menu-c/top-menu-c.component';
import { ErrorComponent } from './sub-components/error/error.component';
import { SearchComponent } from './sub-components/search/search.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './sub-components/home/home.component';
import { OneContentLComponent } from './components/one-content-l/one-content-l.component';
import { OneContentRComponent } from './components/one-content-r/one-content-r.component';
import { TwoContentLComponent } from './components/two-content-l/two-content-l.component';
import { TwoContentRComponent } from './components/two-content-r/two-content-r.component';
import { ContactComponent } from './sub-components/contact/contact.component';
import { BestsellingComponent } from './sub-components/bestselling/bestselling.component';
import { FilterComponent } from './sub-components/filter/filter.component';
import { HelpComponent } from './sub-components/help/help.component';
import { DetailComponent } from './sub-components/detail/detail.component';
import { LoginComponent } from './sub-components/login/login.component';
import { LogoutComponent } from './sub-components/logout/logout.component';
import { CartComponent } from './sub-components/cart/cart.component';
import { RegisterComponent } from './sub-components/register/register.component';
import { BuyComponent } from './sub-components/buy/buy.component';
import { BuyContentLComponent } from './components/buy-content-l/buy-content-l.component';
import { ProfileComponent } from './sub-components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    TopMenuCComponent,
    ErrorComponent,
    SearchComponent,
    FooterComponent,
    HomeComponent,
    OneContentLComponent,
    OneContentRComponent,
    TwoContentLComponent,
    TwoContentRComponent,
    ContactComponent,
    BestsellingComponent,
    FilterComponent,
    HelpComponent,
    DetailComponent,
    LoginComponent,
    LogoutComponent,
    CartComponent,
    RegisterComponent,
    BuyComponent,
    BuyContentLComponent,
    DivideArrayDataPipe,
    SumPipe,
    ProfileComponent,
    FormatNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRouter, {onSameUrlNavigation: 'reload'}),
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [
    BookService,
    ProviderService,
    PublisherService,
    AuthorService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
