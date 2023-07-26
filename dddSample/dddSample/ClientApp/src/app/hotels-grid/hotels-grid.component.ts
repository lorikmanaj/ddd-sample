import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HotelsService } from '../services/hotels.service';
import { Hotel } from '../models/hotel';

@Component({
  selector: 'app-hotels-grid',
  templateUrl: './hotels-grid.component.html',
  styleUrls: ['./hotels-grid.component.css']
})
export class HotelsGridComponent implements OnChanges {
  @Input() selectedCountryId: number | null = null;
  hotels: Hotel[] = [];

  constructor(private hotelsService: HotelsService) {
    this.selectedCountryId = null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedCountryId && this.selectedCountryId) {
      this.loadHotelsByCountry(this.selectedCountryId);
    } else {
      this.hotels = [];
    }
  }

  loadHotelsByCountry(countryId: number): void {
    this.hotelsService.getHotelsByCountry(countryId).subscribe((hotels) => {
      this.hotels = hotels;
    });
  }
}
