import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {PositionType} from '../../shared/interface/position.interface';
import {PositionService} from '../../shared/service/position.service';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {OrderService} from '../../shared/service/order.service';
import {ProfileService} from '../../shared/service/profile.service';
import {AuthService} from '../../shared/service/auth.service';
import {PreloaderService} from '../../shared/service/preloader.service';
import {Language} from '../../shared/interface/language.interface';
import {LanguageService} from '../../shared/service/language.service';

@Component({
  selector: 'app-overview-position-page',
  templateUrl: './overview-position-page.component.html',
  styleUrls: ['./overview-position-page.component.css']
})
export class OverviewPositionPageComponent implements OnInit, AfterContentChecked {
  position: PositionType;
  quantity: number;
  lang: Language;
  constructor(
    private languageService: LanguageService,
    private preloader: PreloaderService,
    private orderService: OrderService,
    private positionService: PositionService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private auth: AuthService
    ) {
  }

  ngOnInit(): void {
    this.lang = this.languageService.initialLanguage;
    this.preloader.open();
    this.route.params.pipe(switchMap((params: Params) => {
      if (params.id) {
        this.positionService.getPosition(params.id).subscribe(position => {
          this.position = position;
          this.preloader.close();
        });
      }
      return of(null);
    })).subscribe();
    const token = this.auth.getToken();
    if (token) {
      this.profileService.getProfile().subscribe();
    }
  }
  ngAfterContentChecked(): void {
    this.lang = this.languageService.initialLanguage;
  }
  changePhoto(imgSmall: string): void {
    this.position.imgLarge = imgSmall;
  }
  changeQuantity(event: any): void {
    this.quantity = +event.target.value[0];
    this.positionService.dispatchQuantity(this.quantity);
  }
  addOrderBasket(position: PositionType): void {
    this.orderService.addOrders(position);
  }
}
