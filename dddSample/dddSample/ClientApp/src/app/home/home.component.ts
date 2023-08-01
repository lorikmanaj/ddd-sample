import { Component, ViewChild } from '@angular/core';
import { AddHotelComponent } from '../add-hotel/add-hotel.component';
import { MatDialog } from '@angular/material/dialog';
import { Hotel } from '../models/hotel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotelsGridComponent } from '../hotels-grid/hotels-grid.component';
import { Country } from '../models/country';
import { AddCountryComponent } from '../add-country/add-country.component';
import { CountriesDropdownComponent } from '../countries-dropdown/countries-dropdown.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedCountryId: number | null = null;

  @ViewChild(HotelsGridComponent) hotelsGridComponent!: HotelsGridComponent;
  @ViewChild(CountriesDropdownComponent) countriesDDComponent!: CountriesDropdownComponent;

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

  onCreateNewCountry(): void {
    let dialogRef = this.dialog.open(AddCountryComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: Country | undefined) => {
      if (result) {
        this.countriesDDComponent.loadCountries();
      } else {
        this.snackBar.open('Add canceled!', 'Close', { duration: 3000 });
      }
    });
  }
}
