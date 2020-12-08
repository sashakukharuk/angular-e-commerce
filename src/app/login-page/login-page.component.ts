import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/service/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {PreloaderService} from '../shared/service/preloader.service';
import {Auth} from '../shared/interface/auth.interface';
import {FormItem, initialForm, ValidateOption} from '../shared/components/form-control/form-control.component';
import {MessageService} from '../shared/service/message.service';
import {LanguageService} from '../shared/service/language.service';
import {Language} from '../shared/interface/language.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy, AfterContentChecked {
  email: FormItem = initialForm('email', 'email');
  password: FormItem = initialForm('password', 'password');
  fieldArray = [this.email, this.password];
  form: Auth = {email: null, password: null};
  aSub: Subscription;
  isBtn = false;
  lang: Language;
  validate: ValidateOption;
  constructor(
    private languageService: LanguageService,
    private message: MessageService,
    private preloader: PreloaderService,
    private auth: AuthService,
    private router: Router) { }

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
  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
  onChange(item: FormItem): string | number {
    switch (item.type) {
      case 'email': {
        return this.form.email = item.value  as string;
      }
      case 'password': {
        return this.form.password = item.value  as string;
      }
    }
  }
  onSubmit(): void {
    this.isBtn = true;
    this.preloader.open();
    this.aSub = this.auth.login(this.form).subscribe(
      () => {
        this.router.navigate(['/']);
        this.preloader.close(); this.isBtn = false;
        },
      error => {
        this.message.toast(error.error.message);
        this.preloader.close();
        this.isBtn = false;
      }
    );
  }
}
