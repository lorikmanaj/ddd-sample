import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/hotel';

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

    return this.http.put<Hotel>(`${this.apiUrl}/hotels/${hotel.hotelId}`, hotel, httpOptions);
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
