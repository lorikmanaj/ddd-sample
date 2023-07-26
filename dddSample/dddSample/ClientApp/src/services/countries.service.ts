import { Injectable } from '@angular/core';
import { environment } from './../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from '../app/models/country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/countries`);
  }

  getCountryById(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.apiUrl}/countries/${id}`);
  }

  updateCountry(country: Country): Observable<Country> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put<Country>(`${this.apiUrl}/countries/${country.id}`, country, httpOptions);
  }

  addCountry(country: Country): Observable<Country> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Country>(`${this.apiUrl}/countries`, country, httpOptions);
  }

  deleteCountry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/countries/${id}`);
  }
}