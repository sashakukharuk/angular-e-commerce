import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {OrderType} from '../shared/interface/order.interface';
import {ModalService} from '../shared/service/modal.service';
import {Language} from '../shared/interface/language.interface';
import {LanguageService} from '../shared/service/language.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterContentChecked{
  positions: Array<OrderType> = [];
  lang: Language;
  constructor(private languageService: LanguageService, public modal: ModalService) {}
  ngOnInit(): void {
    this.lang = this.languageService.initialLanguage;
  }
  ngAfterContentChecked(): void {
    this.lang = this.languageService.initialLanguage;
  }
  closeModal(): void {
    this.modal.close();
  }
  deletePosition(id: string): void {
    this.modal.delete(id);
  }
}
