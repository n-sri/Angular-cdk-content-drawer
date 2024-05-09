import { Observable, map, of } from 'rxjs';
import { Product } from '../models/home.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>('https://fakestoreapi.com/products').pipe(
      map((result) => {
        return result;
      })
    );
  }
}
