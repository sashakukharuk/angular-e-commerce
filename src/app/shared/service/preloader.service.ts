import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  interval: any;
  width = 0;
  margin = 0;
  delta = 0;
  block: any;
  isPre = true;
  constructor() {
  }
  open(): void {
    if (this.isPre) {
      this.isPre = false;
      this.interval = setInterval((a = 0.5) => {
        if ( this.width !== 100) {
          this.block.nativeElement.style.marginLeft = 0;
          this.width += a;
          this.block.nativeElement.style.width = `${this.width}%`;
        } else {
          if ( this.margin !== 100) {
            this.margin += a;
            this.delta =  this.width - this.margin;
            this.block.nativeElement.style.marginLeft = `${this.margin}%`;
            this.block.nativeElement.style.width = `${this.delta}%`;
          } else {
            this.width = 0;
            this.margin = 0;
          }
        }
      }, 5);
    }
  }
  close(): void {
    this.isPre = true;
    this.block.nativeElement.style.marginLeft = 0;
    this.block.nativeElement.style.width = 0;
    clearInterval(this.interval);
    this.width = 0;
    this.margin = 0;
    this.delta = 0;
  }
  setBlock(item): void {
    this.block = item;
  }
}
