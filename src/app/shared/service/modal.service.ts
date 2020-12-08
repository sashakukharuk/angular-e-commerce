import {Injectable} from '@angular/core';
import {OrderService} from './order.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isModal = false;
  constructor(public addedOrders: OrderService, private orderService: OrderService) {
  }
  open(): void {
    this.isModal = true;
  }
  close(): void {
    this.isModal = false;
  }
  delete(id: string): void {
    this.orderService.remove(id);
  }
}
