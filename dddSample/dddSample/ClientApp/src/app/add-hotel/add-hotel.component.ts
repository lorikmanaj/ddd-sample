import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../services/hotels.service';
import { Hotel } from '../models/hotel';
import { Country } from '../models/country';
import { CountriesService } from '../services/countries.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {
  countries: Country[] = [];
  hotel: Hotel = {
    name: '',
    starsRating: 0,
    comment: '',
    address: '',
    countryId: 0,
    id: 0
  };

  constructor(private hotelsService: HotelsService, 
    private countriesService: CountriesService,
    public dialogRef: MatDialogRef<AddHotelComponent>,
    private snackBar: MatSnackBar) {
      
    }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countriesService.getCountries().subscribe(
      (countries) => {
        this.countries = countries;
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      // Handle form validation errors, if needed.
      return;
    }

    this.hotelsService.addHotel(this.hotel).subscribe(
      (hotel) => {
        // Do something after successfully adding the hotel, like refreshing the hotels grid.
        console.log('Hotel added successfully:', hotel);
        // Optionally, reset the form after submission.
        form.resetForm();
        this.dialogRef.close(this.hotel);
      },
      (error) => {
        console.error('Error adding hotel:', error);
      }
    );
  }

  onCancelDialog(): void {
    this.dialogRef.close();
    this.snackBar.open("Closed!")
  }

  onCountryChange(countryId: number | null): void {
    this.hotel.countryId = countryId !== null ? countryId : 0;
  }
}
