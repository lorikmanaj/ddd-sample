import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { HotelsService } from '../services/hotels.service';
import { Hotel } from '../models/hotel';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from './../edit-modal/edit-modal.component';

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
    private dialog: MatDialog
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedCountryId && this.selectedCountryId !== null) {
      this.loadHotelsByCountry(this.selectedCountryId);
    } else {
      this.hotels = [];
    }
  }

  loadHotelsByCountry(countryId: number | null): void {
    if (countryId !== null) {
      this.hotelsService.getHotelsByCountry(countryId).subscribe((hotels) => {
        this.hotels = hotels;
        this.dataSource.data = this.hotels;
      });
    } else {
      //Case when countryId is null
      //For example you may want to show all hotels when no country is selected
      this.hotelsService.getHotels().subscribe((hotels) => {
        this.hotels = hotels;
        this.dataSource.data = this.hotels;
      });
    }
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

  onEditHotel(hotel: Hotel): void {
    let dialogRef = this.dialog.open(EditModalComponent, {
      width: '400px',
      data: { hotel }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadHotelsByCountry(hotel.countryId);
        this.snackBar.open('Hotel edited successfully!', 'Close', { duration: 3000 });
      } else {
        this.snackBar.open('Edit canceled!', 'Close', { duration: 3000 });
      }
    });
  }
}