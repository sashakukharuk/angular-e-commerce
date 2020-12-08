import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LanguageType} from '../interface/language.interface';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  initialLanguage = {
    sizeL: 'Розмір',
    quantityL: 'Кількість',
    priceL: 'Ціна',
    currencyL: 'грн.',
    personalL: 'Особисті дані',
    firstNameL: 'Ім`я',
    lastNameL: 'Прізвище',
    phoneNumberL: 'Мобільний номер',
    cancelL: 'Скасувати',
    confirmL: 'Замовити',
    logInL: 'Увійти',
    registerL: 'Реєстрація',
    logOutL: 'Вийти',
    basketL: 'Корзина',
    goodsL: 'Товари',
    nameL: 'Назва',
    deleteL: 'Видалити',
    totalPriceL: 'Загальна вартість',
    registerTitleL: 'Реестрація',
    registerBtnL: 'Зареєструватися',
    emailL: 'Пошта',
    passwordL: 'Пароль',
    repetitionPasswordL: 'Повторіть пароль',
    orderL: 'Замовлення',
    cityL: 'Місто',
    deliveryPointL: 'Нова пошта',
    inBasketL: 'В корзину',
    buyL: 'Купити',
    contactsL: 'Контакти',
    phoneL: 'тел.',
    applyL: 'Застосувати',
    fromL: 'Від',
    toL: 'До',
    requiredL: 'Заповніть поле',
    minL: 'Мало символів має бути',
    maxL: 'Багато символів має бути',
    addBasketL: 'Товар додано',
    cameOutL: 'Ви вийшли з акаунту'
  };
  constructor(private http: HttpClient) {
  }
  getLanguage(name: string): Observable<LanguageType> {
    return this.http.get<LanguageType>(`api/language/${name}`).pipe(
      tap((res) => {
        this.initialLanguage = res.language;
      })
    );
  }
}
