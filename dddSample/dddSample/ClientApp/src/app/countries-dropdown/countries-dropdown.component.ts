import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { Country } from '../models/country';

@Component({
  selector: 'app-countries-dropdown',
  templateUrl: './countries-dropdown.component.html',
  styleUrls: ['./countries-dropdown.component.css']
})
export class CountriesDropdownComponent implements OnInit {
  countries: Country[] = [];

  @Input() selectedCountryId: number | null = 0;
  @Output() countrySelected: EventEmitter<number | null> = new EventEmitter<number | null>();

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countriesService.getCountries().subscribe(
      (countries) => {
        console.log('Countries fetched:', countries);
        this.countries = countries;
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  onCountryChange(): void {
    console.log('Selected Country ID:', this.selectedCountryId);
    this.countrySelected.emit(this.selectedCountryId);
  }

  getSelectedCountry(): string | null {
    if (this.selectedCountryId) {
      return this.countries.find((country) => country.id === this.selectedCountryId)?.name || null;
    }
    return null;
  }
}
