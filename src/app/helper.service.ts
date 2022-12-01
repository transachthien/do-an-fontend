import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartDTO } from './dto/cartDTO';
import { OrderDTO } from './dto/oderDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",

    }), responseType: 'text' as 'json'
  };
  private apiServerUrl =environment.base_api_url;

  constructor(private http: HttpClient) { }

  public getAllProduct():Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/product/getAllProduct`,this.httpOptions)
  }
  public getProductDetail(id: number):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/product/getProductDetail?id=${id}`,this.httpOptions)
  }
  public caculatePrice(cart:CartDTO):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/api/cart/caculate`,cart,this.httpOptions)
  }
  public saveOrder(order: any):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/api/order`,order,this.httpOptions)
  }
}
