import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {PositionType} from '../shared/interface/position.interface';
import {PositionService} from '../shared/service/position.service';
import {FilterInterface} from '../shared/interface/filter.interface';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {PreloaderService} from '../shared/service/preloader.service';
import {Language} from '../shared/interface/language.interface';
import {LanguageService} from '../shared/service/language.service';

@Component({
  selector: 'app-position-page',
  templateUrl: './position-page.component.html',
  styleUrls: ['./position-page.component.css']
})
export class PositionPageComponent implements OnInit, AfterContentChecked {
  positions: Array<PositionType> = [];
  filter;
  lang: Language;
  constructor(
    private languageService: LanguageService,
    private preloader: PreloaderService,
    private positionsService: PositionService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.lang = this.languageService.initialLanguage;
    this.getPositions();
  }
  ngAfterContentChecked(): void {
    this.lang = this.languageService.initialLanguage;
  }
  getPositions(): void {
    this.preloader.open();
    this.route.params.pipe(switchMap((params: Params) => {
      if (params.id) {
        const param = Object.assign({}, this.filter);
        this.positionsService.getPositions(params.id, param).subscribe(position => {
          this.positions = position;
          this.preloader.close();
        });
      }
      return of(null);
    })).subscribe();
  }
  applyFilter(filter: FilterInterface): void {
    this.filter = filter;
    this.getPositions();
  }
}
