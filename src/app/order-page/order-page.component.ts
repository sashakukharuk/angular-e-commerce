import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {OrderService} from '../shared/service/order.service';
import {List, OrderFormType, OrderType} from '../shared/interface/order.interface';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {of} from 'rxjs';
import {ProfileService} from '../shared/service/profile.service';
import {Profile} from '../shared/interface/profile.interface';
import {PreloaderService} from '../shared/service/preloader.service';
import {FormItem, initialForm, ValidateOption} from '../shared/components/form-control/form-control.component';
import {MessageService} from '../shared/service/message.service';
import {Language} from '../shared/interface/language.interface';
import {LanguageService} from '../shared/service/language.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit, AfterContentChecked {
  valueFirstName: string;
  valueLastName: string;
  valuePhone: number;
  firstName: FormItem = initialForm('firstName', 'first name', '');
  lastName: FormItem = initialForm('lastName', 'last name', '');
  phone: FormItem = initialForm('number', 'phone', '', '',  3, 12);
  email: FormItem = initialForm('email', 'email');
  city: FormItem = initialForm('city', 'city');
  novaPosh: FormItem = initialForm('novaPosh', 'nova posh');
  fieldsProfile = [this.firstName, this.lastName, this.phone, this.email, this.city, this.novaPosh];
  orders: Array<OrderType> = [];
  positionId: number;
  isBtn = false;
  state: Profile;
  orderState: OrderFormType;
  lang: Language;
  validate: ValidateOption;
  constructor(
    private languageService: LanguageService,
    private message: MessageService,
    private preloader: PreloaderService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    public router: Router,
    private pS: ProfileService) { }
  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
        if (params.id) {
          this.positionId = params.id;
          this.orders.push(this.orderService.getOrder());
        } else {
          this.orders = this.orderService.orders;
        }
        return of(null);
    })).subscribe();
    this.valueFirstName = this.pS.profile ? this.pS.profile.firstName : null;
    this.valueLastName = this.pS.profile ? this.pS.profile.lastName : null;
    this.valuePhone = this.pS.profile ? this.pS.profile.phone : null;
    this.firstName.value = this.valueFirstName;
    this.lastName.value = this.valueLastName;
    this.phone.value = this.valuePhone;
    this.initialField();
    this.orderState = this.initialState(this.valueFirstName, this.valueLastName, this.valuePhone);
    if (this.orders.length === 0) {
      this.router.navigate(['/']);
    }
  }
  ngAfterContentChecked(): void {
    this.initialField();
  }
  initialField(): void {
    this.lang = this.languageService.initialLanguage;
    this.validate = {required: this.lang.requiredL, min: this.lang.minL, max: this.lang.maxL};
    this.email.label = this.lang.emailL;
    this.firstName.label = this.lang.firstNameL;
    this.lastName.label = this.lang.lastNameL;
    this.phone.label = this.lang.phoneNumberL;
    this.city.label = this.lang.cityL;
    this.novaPosh.label = this.lang.deliveryPointL;
  }
  onChange(item: FormItem): void {
    this.fieldsProfile.forEach(p => p.type === item.type ? p.value = item.value : '');
    this.orderState = this.initialState(
      this.firstName.value as string,
      this.lastName.value as string,
      +this.phone.value,
      this.email.value as string,
      this.city.value as string,
      this.novaPosh.value as string
    );
  }
  initialState(
    firstName: string,
    lastName: string,
    phone: number,
    email?: string,
    city?: string,
    novaPosh?: string,
    list?: List[]
  ): OrderFormType {
    return {firstName, lastName, phone, email, city, novaPosh, list};
  }
  onSubmit(): void {
    this.isBtn = true;
    this.preloader.open();
    this.orderState.list = this.orders.map(o => {
      return {positionId: o._id, quantity: o.quantity};
    });
    this.orderService.create(this.orderState).subscribe(
      () => {this.router.navigate(['/']); this.preloader.close(); this.isBtn = false; },
      error => {
        this.message.toast(error.error.message);
        this.isBtn = false;
        this.preloader.close();
      }
    );
  }
}
