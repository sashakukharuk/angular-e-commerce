import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/service/categories.service';
import {ActualCategoriesType, CategoriesInterface} from '../shared/interface/categories.interface';
import {ModalService} from '../shared/service/modal.service';
import {PreloaderService} from '../shared/service/preloader.service';
import {AuthService} from '../shared/service/auth.service';
import {ProfileService} from '../shared/service/profile.service';
import {MessageService} from '../shared/service/message.service';
import {LanguageService} from '../shared/service/language.service';
import {Language} from '../shared/interface/language.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit,  AfterContentChecked {
  categoriesPrev: CategoriesInterface[];
  categories: ActualCategoriesType[];
  isAuth = false;
  nowLanguage = 'ua';
  languages: {value: string}[] = [{value: 'ua'}, {value: 'ru'}, {value: 'en'}];
  isLanguage = false;
  lang: Language;
  constructor(
    private languageService: LanguageService,
    private message: MessageService,
    public preloader: PreloaderService,
    public modal: ModalService,
    private categoriesService: CategoriesService,
    private auth: AuthService,
    private profileService: ProfileService
    ) {
  }
  ngOnInit(): void {
    this.lang = this.languageService.initialLanguage;
    this.preloader.open();
    this.categoriesService.getCategories().subscribe(categories => {
        this.categoriesPrev = categories;
        this.changeCategoriesLanguage(categories);
        this.preloader.close();
      }
    );
  }
  ngAfterContentChecked(): void {
    this.lang = this.languageService.initialLanguage;
    this.changeCategoriesLanguage(this.categoriesPrev);
  }
  changeCategoriesLanguage(categories: CategoriesInterface[]): void {
    if (categories) {
      this.categories = categories.map(category => {
        const object = Object.entries(category.name);
        for (const [name, value] of object) {
          if (name === this.nowLanguage) {
            return {
              _id: category._id, name: value
            };
          }
        }
      });
    }
  }
  openMenuAuth(): void {
    this.isAuth = !this.isAuth;
  }
  openMenuLanguage(): void {
    this.isLanguage = !this.isLanguage;
  }
  changeLanguage(language: string): void {
    this.preloader.open();
    this.nowLanguage = language;
    this.languageService.getLanguage(language).subscribe(() => this.preloader.close());
  }
  openModal(): void {
    this.modal.open();
  }
  checkOut(): void {
    this.auth.logout();
    this.profileService.clearProfile();
    this.message.toast(this.lang.cameOutL);
  }
}
