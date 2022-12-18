import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductDTO } from './dto/productDTO';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl =environment.base_api_url;

  httpOptions: any;
  token : any;
  
  private apiServerUrl =environment.base_api_url;

  constructor(private http: HttpClient, private storageService : StorageService) {
    this.token = storageService.getUser().access_token;
    console.log(this.token)
    this.httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ` + this.token,
    }),
    "Access-Control-Allow-Origin": `${environment.base_api_url}`,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
}; }

  public getProducts(): Observable<any>{
    return this.http.get<ProductDTO[]>(`${this.apiUrl}/api/product/all`, this.httpOptions);
  }
  public addProduct(Product : any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/api/product/addProduct`,Product,this.httpOptions);
  }
  public updateProduct(Product : any): Observable<any>{
    return this.http.put<ProductDTO>(`${this.apiUrl}/api/product/update`,Product,this.httpOptions);
  }
  public deleteProduct(ProductId : number): Observable<any>{
    return this.http.delete<void>(`${this.apiUrl}/api/product/delete/${ProductId}`,this.httpOptions);
  }
}