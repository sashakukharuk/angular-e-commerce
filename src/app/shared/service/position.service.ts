import {Injectable} from '@angular/core';
import {PositionType} from '../interface/position.interface';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  position: PositionType;
  params: string;
  constructor(private http: HttpClient) {
  }
  getPositions(id: string, params: any): Observable<PositionType[]> {
    return this.http.get<PositionType[]>(`/api/categories/${id}`, {
      params: new HttpParams({
        fromObject: params
      })
    });
  }
  getPosition(id: string): Observable<PositionType> {
    return this.http.get<PositionType>(`/api/position/${id}`).pipe(
      tap(
        (position) => {
          this.position = position;
        }
      )
    );
  }
  getPositionForOrder(): PositionType {
    return this.position;
  }
  dispatchQuantity(quantity: number): void {
    this.position.quantity = quantity;
  }
}
