import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedCountryId: number | null = null;

  onCountrySelected(countryId: number | null): void {
    if (countryId !== null) {
      this.selectedCountryId = countryId;
    } else {
      this.selectedCountryId = null;
    }
  }
}
