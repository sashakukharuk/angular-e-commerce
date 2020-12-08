import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './main-page/main-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {PositionPageComponent} from './position-page/position-page.component';
import {OrderPageComponent} from './order-page/order-page.component';
import {OverviewPositionPageComponent} from './position-page/overview-position-page/overview-position-page.component';
import {FilterPageComponent} from './position-page/filter-page/filter-page.component';
import {ModalComponent} from './modal/modal.component';
import {TokenInterceptor} from './shared/interceptor/token.interceptor';
import {PreloaderComponent} from './shared/components/preloader/preloader.component';
import {FormControlComponent} from './shared/components/form-control/form-control.component';
import {MessageComponent} from './shared/components/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    PositionPageComponent,
    OrderPageComponent,
    OverviewPositionPageComponent,
    FilterPageComponent,
    ModalComponent,
    PreloaderComponent,
    FormControlComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
