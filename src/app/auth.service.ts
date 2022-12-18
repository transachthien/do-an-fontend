import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

 const apiServerUrl =environment.base_api_url;;

let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set(`username`, username)
      .set(`password`, password);
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        "Access-Control-Allow-Origin": "http://localhost:4200",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    };  
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<any>(`${apiServerUrl}/api/login`, body.toString(), httpOptions)
      // .map((res: HttpResponse<Object>) => res.ok)
      // .catch((err: any) => Observable.of(false));
  }
  //   return this.http.post(
  //     apiServerUrl + 'api/login',
  //     {
  //       username,
  //       password,
  //     },
  //     httpOptions
  //   );
  // }

  // register(username: string, email: string, password: string): Observable<any> {
  //   return this.http.post(
  //     apiServerUrl + 'signup',
  //     {
  //       username,
  //       email,
  //       password,
  //     },
  //     httpOptions
  //   );
  // }

  // logout(): Observable<any> {
  //   return this.http.post(apiServerUrl + 'signout', { }, httpOptions);
  // }
}
