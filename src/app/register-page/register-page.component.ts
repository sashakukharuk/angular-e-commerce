import {AfterContentChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../shared/service/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ProfileService} from '../shared/service/profile.service';
import {PreloaderService} from '../shared/service/preloader.service';
import {FormItem, initialForm, ValidateOption} from '../shared/components/form-control/form-control.component';
import {Auth} from '../shared/interface/auth.interface';
import {Profile} from '../shared/interface/profile.interface';
import {MessageService} from '../shared/service/message.service';
import {LanguageService} from '../shared/service/language.service';
import {Language} from '../shared/interface/language.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy, AfterContentChecked {
  email: FormItem = initialForm('email', 'email');
  password: FormItem = initialForm('password', 'password');
  firstName: FormItem = initialForm('firstName', 'first name');
  lastName: FormItem = initialForm('lastName', 'last name');
  phone: FormItem = initialForm('number', 'phone', null, '', 3, 12);
  fieldsAuth: FormItem[] = [this.email, this.password];
  fieldsProfile: FormItem[] = [this.firstName, this.lastName, this.phone];
  authState: Auth = {email: this.email.value as string, password: this.password.value as string};
  profileState: Profile;
  aSub: Subscription;
  isPassword = false;
  isBtn = false;
  lang: Language;
  validate: ValidateOption;
  @ViewChild('actualPassword') actualPasswordRef: ElementRef;
  constructor(
    private languageService: LanguageService,
    private message: MessageService,
    private preloader: PreloaderService,
    private auth: AuthService,
    private router: Router,
    private profile: ProfileService) { }

  ngOnInit(): void {
    this.initialField();
  }
  ngAfterContentChecked(): void {
    this.initialField();
  }
  initialField(): void {
    this.lang = this.languageService.initialLanguage;
    this.validate = {required: this.lang.requiredL, min: this.lang.minL, max: this.lang.maxL};
    this.email.label = this.lang.emailL;
    this.password.label = this.lang.passwordL;
    this.firstName.label = this.lang.firstNameL;
    this.lastName.label = this.lang.lastNameL;
    this.phone.label = this.lang.phoneNumberL;
  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
  onChange(item: FormItem): void {
   this.fieldsAuth.forEach(p => p.type === item.type ? p.value = item.value : '');
   this.fieldsProfile.forEach(p => p.type === item.type ? p.value = item.value : '');
   this.authState = {email: this.email.value as string, password: this.password.value as string};
   this.profileState = {
      firstName: this.firstName.value as string,
      lastName: this.lastName.value as string,
      phone: +this.phone.value as number
   };
  }
  onFocus(): void {
    this.isPassword = this.actualPasswordRef.nativeElement.value !== this.authState.password;
  }
  onSubmit(): void {
    this.isBtn = true;
    this.preloader.open();
    this.aSub = this.auth.register(this.authState).subscribe(
      (res) => this.profile.create(this.profileState, res._id).subscribe(
        () => {this.router.navigate(['/login']); this.preloader.close(); this.isBtn = true; },
        error => {
          this.message.toast(error.error.message);
          this.preloader.close();
          this.isBtn = false;
        }
      ),
      error => {
        this.message.toast(error.error.message);
        this.preloader.close();
        this.isBtn = false;
      }
    );
  }
}
