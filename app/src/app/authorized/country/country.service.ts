import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly apiUrl = '/api/country';

  constructor(private readonly http: HttpClient) {}

  public getAllCountry(): Observable<any> {
    const headers: HttpHeaders = this.getAuthHeaders();

    // chama login service para atualizar o token

    return this.http.get<any>(`${this.apiUrl}`, { headers });
  }

  public getOnCountry(id: number): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.get<any>(`${this.apiUrl}/1`, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('acess_token');

    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    }
    return new HttpHeaders();
  }
}
