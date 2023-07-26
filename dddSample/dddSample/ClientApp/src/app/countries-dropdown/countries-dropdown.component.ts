import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { Country } from '../models/country';

@Component({
  selector: 'app-countries-dropdown',
  templateUrl: './countries-dropdown.component.html',
  styleUrls: ['./countries-dropdown.component.css']
})
export class CountriesDropdownComponent implements OnInit {
  countries: Country[] = [];
  selectedCountryId: number | null = null;

  @Output() countrySelected: EventEmitter<number | null> = new EventEmitter<number | null>();

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countriesService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  onCountryChange(): void {
    this.countrySelected.emit(this.selectedCountryId);
  }
}
