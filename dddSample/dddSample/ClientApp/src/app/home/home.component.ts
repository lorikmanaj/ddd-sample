import { Component, ViewChild } from '@angular/core';
import { AddHotelComponent } from '../add-hotel/add-hotel.component';
import { MatDialog } from '@angular/material/dialog';
import { HotelsService } from './../services/hotels.service';
import { Hotel } from '../models/hotel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotelsGridComponent } from '../hotels-grid/hotels-grid.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedCountryId: number | null = null;

  @ViewChild(HotelsGridComponent) hotelsGridComponent!: HotelsGridComponent;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  onCountrySelected(countryId: number | null): void {
    if (countryId !== null) {
      this.selectedCountryId = countryId;
    } else {
      this.selectedCountryId = null;
    }
  }
      
  onCreateNewHotel(): void {
    let dialogRef = this.dialog.open(AddHotelComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: Hotel | undefined) => {
      if (result) {
        this.hotelsGridComponent.loadHotelsByCountry(this.selectedCountryId || 0);
      } else {
        this.snackBar.open('Add canceled!', 'Close', { duration: 3000 });
      }
    });
  }
}
