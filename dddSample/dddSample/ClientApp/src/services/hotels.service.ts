import { Injectable } from '@angular/core';
import { environment } from './../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hotel } from '../app/models/hotel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}/hotels`);
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/hotels/${id}`);
  }

  updateHotel(hotel: Hotel): Observable<Hotel> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put<Hotel>(`${this.apiUrl}/hotels/${hotel.id}`, hotel, httpOptions);
  }

  addHotel(hotel: Hotel): Observable<Hotel> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Hotel>(`${this.apiUrl}/hotels`, hotel, httpOptions);
  }

  deleteHotel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/hotels/${id}`);
  }
}
