import { Component } from '@angular/core';
import { AddHotelComponent } from '../add-hotel/add-hotel.component';
import { MatDialog } from '@angular/material/dialog';
import { HotelsService } from './../services/hotels.service';
import { Hotel } from '../models/hotel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedCountryId: number | null = null;

  constructor(
    hotelsService: HotelsService,
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

  onCreateNewHotel() {
    let dialogRef = this.dialog.open(AddHotelComponent);
    
    // dialogRef.afterClosed().subscribe((result: Hotel | undefined) => {
    //   if (result) {
    //     this.snackBar.open('Hotel created successfully!', 'Close', { duration: 3000 });
    //     this.loadHotelsByCountry(this.selectedCountryId || 0);

    //     dialogRef.componentInstance.hotelUpdated.subscribe(() => {
    //       this.loadHotelsByCountry(this.selectedCountryId || 0);
    //     });
    //   } else {
    //     this.snackBar.open('Edit failed!', 'Close', { duration: 3000 });
    //   }
    // });
  }

}
