import {Injectable} from '@angular/core';
import {CategoriesInterface} from '../interface/categories.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {
  }
  getCategories(): Observable<CategoriesInterface[]> {
    return this.http.get<CategoriesInterface[]>('/api/categories/');
  }
}
