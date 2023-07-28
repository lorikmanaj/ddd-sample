import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HotelsService } from '../services/hotels.service';
import { Hotel } from '../models/hotel';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-hotels-grid',
  templateUrl: './hotels-grid.component.html',
  styleUrls: ['./hotels-grid.component.css']
})
export class HotelsGridComponent implements OnChanges {
  @Input() selectedCountryId: number | null = null;

  hotels: Hotel[] = [];
  dataSource: MatTableDataSource<Hotel> = new MatTableDataSource<Hotel>();
  displayedColumns: string[] = ['name', 'starsRating', 'comment', 'address'];

  constructor(
    private hotelsService: HotelsService,
    private snackBar: MatSnackBar,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.selectedCountryId = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedCountryId && this.selectedCountryId !== null) {
      this.loadHotelsByCountry(this.selectedCountryId);
    } else {
      this.hotels = [];
    }
  }

  loadHotelsByCountry(countryId: number): void {
    this.hotelsService.getHotelsByCountry(countryId).subscribe((hotels) => {
      this.hotels = hotels;
      this.dataSource.data = this.hotels;
    });
  }

  onDeleteHotel(hotel: Hotel): void {
    this.hotelsService.deleteHotel(hotel.id).subscribe(
      () => {
        const countryId = this.selectedCountryId !== null ? this.selectedCountryId : 0;
        this.loadHotelsByCountry(countryId);
        this.snackBar.open('Hotel deleted successfully!', 'Close', { duration: 3000 });
      },
      (error) => {
        console.error('Error deleting hotel:', error);
        this.snackBar.open('Error deleting hotel. Please try again later.', 'Close', { duration: 5000 });
      }
    );
  }

  getTrashIconUrl(): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl('assets/trash-icon.svg');
  }
}
