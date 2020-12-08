import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: string;
  hidden = false;
  timeout: number;
  constructor() {
  }
  toast(message: string): void {
    this.message = message;
    this.hidden = true;
    new Promise((resolve) => {
      this.timeout = setTimeout(() => {
        this.hidden = false;
        resolve();
      }, 3000);
    }).then(() => clearTimeout(this.timeout));
  }
}
