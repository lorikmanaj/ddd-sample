import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from '../models/country';
import { HttpClient } from '@angular/common/http';
import { CountriesService } from '../services/countries.service';
import { HotelsService } from '../services/hotels.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  //countryForm: FormGroup;
  countries: Country[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private countriesSvc: CountriesService) {

  }

  ngOnInit() {
    // this.countryForm = this.formBuilder.group({
    //   selectedCountry: ['']
    // });

    // this.countries = this.countriesSvc.getCountries().subscribe(() => {
    //   console.log('GetAll Countries invoked!')
    // })
    // this.http.get<Country[]>('http://localhost:5209/api/Countries/').subscribe(
    //   (data) => {
    //     this.countries = data;
    //   },
    //   (error) => {
    //     console.error('Error fetching countries:', error);
    //   }
    // );
  }
}
