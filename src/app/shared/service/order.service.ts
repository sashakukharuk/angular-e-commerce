import {Injectable} from '@angular/core';
import {OrderFormType, OrderType} from '../interface/order.interface';
import {PositionService} from './position.service';
import {PositionType} from '../interface/position.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageService} from './message.service';
import {LanguageService} from './language.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public orders: Array<OrderType> = [];
  public cost: number;
  constructor(
    private languageService: LanguageService,
    private message: MessageService,
    private positionService: PositionService,
    private http: HttpClient) {
  }
  getOrder(): OrderType {
    const position = this.positionService.getPositionForOrder();
    return this.createObjectPositions(position);
  }
  addOrders(position: PositionType): void {
    const orderPosition: OrderType  = Object.assign({}, this.createObjectPositions(position));
    const candidate = this.orders.find(p => p._id === position._id);
    if (candidate) {
      candidate.quantity += orderPosition.quantity;
      this.message.toast(`${this.languageService.initialLanguage.addBasketL} ${candidate.quantity}x`);
    } else {
      this.orders.push(orderPosition);
      this.message.toast(`${this.languageService.initialLanguage.addBasketL} ${orderPosition.quantity}x`);
    }
    this.compute();
  }
  remove(id: string): void {
    const idx = this.orders.findIndex(p => p._id === id);
    this.orders.splice(idx, 1);
    this.compute();
  }
  private compute(): void {
    this.cost = this.orders.reduce((total, item) => {
      total += item.quantity * item.price;
      return total;
    }, 0);
  }
  createObjectPositions(item: PositionType): OrderType {
    return {
      _id: item._id,
      image: item.imgLarge,
      name: item.name,
      price: item.price,
      size: item.size,
      quantity: item.quantity
    };
  }
  create(order: OrderFormType): Observable<OrderFormType> {
    return this.http.post<OrderFormType>('/api/order', order);
  }
}
