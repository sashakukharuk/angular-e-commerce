import {Component, OnInit, Output, EventEmitter, AfterContentChecked} from '@angular/core';
import {FilterInterface} from '../../shared/interface/filter.interface';
import {Language} from '../../shared/interface/language.interface';
import {LanguageService} from '../../shared/service/language.service';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.css']
})
export class FilterPageComponent implements OnInit, AfterContentChecked {
  @Output() ofFilter = new EventEmitter<FilterInterface>();
  from: number;
  to: number;
  size: string;
  arraySize = [{value: 'S'}, {value: 'M'}, {value: 'L'}, {value: 'XL'}, {value: 'XXL'}];
  isSize = false;
  lang: Language;
  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.lang = this.languageService.initialLanguage;
  }
  ngAfterContentChecked(): void {
    this.lang = this.languageService.initialLanguage;
  }
  submitFilter(): void {
    const filter: FilterInterface = {};
    if (this.from) {
      filter.from = this.from;
    }
    if (this.to) {
      filter.to = this.to;
    }
    if (this.size) {
      filter.size = this.size;
    }
    this.ofFilter.emit(filter);
  }
  openAndCloseMenu(): void {
    this.isSize = !this.isSize;
  }
  changeSize(size): void {
    this.size = size.value;
    this.openAndCloseMenu();
  }
}
