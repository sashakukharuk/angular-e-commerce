import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {PreloaderService} from '../../service/preloader.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit,  AfterViewInit {
  constructor(public preloader: PreloaderService) { }
  @ViewChild('block') blockRef: ElementRef;
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.preloader.setBlock(this.blockRef);
  }
}
