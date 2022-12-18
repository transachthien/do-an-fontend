import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartDTO } from './dto/cartDTO';
import { OrderDTO } from './dto/oderDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  httpOptions: any;
  
  private apiServerUrl =environment.base_api_url;

  constructor(private http: HttpClient) {this.httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
    "Access-Control-Allow-Origin": `${environment.base_api_url}`,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
}; }

  public getAllProduct(name :string, category:string):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/api/product/getAllProduct?name=${name}&category=${category}`,this.httpOptions)
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
  public addProduct(product:any):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/api/product/addProduct`,product,this.httpOptions)
  }
}
