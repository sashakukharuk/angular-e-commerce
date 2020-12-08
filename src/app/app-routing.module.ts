import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {PositionPageComponent} from './position-page/position-page.component';
import {OrderPageComponent} from './order-page/order-page.component';
import {OverviewPositionPageComponent} from './position-page/overview-position-page/overview-position-page.component';

const routes: Routes = [
  {path: '', component: MainPageComponent, children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {path: 'categories', component: PositionPageComponent},
      {path: 'categories/:id', component: PositionPageComponent},
      {path: 'position/:id', component: OverviewPositionPageComponent},
      {path: 'order', component: OrderPageComponent},
      {path: 'order/:id', component: OrderPageComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
