import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Response } from './register/models/RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class UserAPI {
  baseUrl = "http://localhost:4200/api/user/";

  constructor(private http: HttpClient) {}
 
  createUser(form: FormGroup): Observable<Response>{   
    return this.http.post<Response>(this.baseUrl + "create", form.value);
  }

  getUser(id: number): Observable<Response>{
    return this.http.get<Response>(this.baseUrl + id);
  }
  
  updateUser(form: FormGroup, id: number): Observable<Response> {
    return this.http.put<Response>(this.baseUrl + id, form.value);
  }

  deleteUser(id: number): Observable<Response> {
    return this.http.delete<Response>(this.baseUrl + id);
  }
  
}
