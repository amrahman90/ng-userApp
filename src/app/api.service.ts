import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly apiUrl: string = environment.apiUrl + 'api/';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = {"email": email, "password": password};
    return this.http.post(this.apiUrl + 'login', body)
  }

  getUser(id: string): Observable<any> {
    return this.http.get(this.apiUrl + 'users/' + id);
  }

  fetchUsers(): Observable<any> {
    return this.http.get(this.apiUrl + 'users');
  }
}
