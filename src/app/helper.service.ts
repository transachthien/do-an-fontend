import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartDTO } from './dto/cartDTO';
import { OrderDTO } from './dto/oderDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private apiServerUrl =environment.base_api_url;

  constructor(private http: HttpClient) { }

  public getAllProduct():Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/product/getAllProduct`)
  }
  public getProductDetail(id: number):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/product/getProductDetail?id=${id}`)
  }
  public caculatePrice(cart:CartDTO):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/api/cart/caculate`,cart)
  }
  public saveOrder(order: OrderDTO):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/api/order`,order)
  }
}
