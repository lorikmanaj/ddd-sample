import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Country } from '../models/country';
import { CountriesService } from '../services/countries.service';
import { CountriesDropdownComponent } from '../countries-dropdown/countries-dropdown.component';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {
  country: Country = {
    name: '',
    shortName: '',
    id: 0
  };

  constructor(private countriesService: CountriesService,
    public dialogRef: MatDialogRef<AddCountryComponent>,
    private countriesDropdownComponent: CountriesDropdownComponent) {
      
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.countriesService.addCountry(this.country).subscribe(
      (country) => {
        console.log('Country added successfully:', country);
        this.countriesDropdownComponent.loadCountries();
        // Optionally, reset the form after submission.
        form.resetForm();
        this.dialogRef.close(country);
      },
      (error) => {
        console.error('Error adding country:', error);
      }
    );
  }

  onCancelDialog(): void {
    this.dialogRef.close();
  }
}
