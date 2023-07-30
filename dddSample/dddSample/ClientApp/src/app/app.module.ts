import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
// import { MatIconRegistry } from '@angular/material/icon';
// import { DomSanitizer } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { CountriesDropdownComponent } from './countries-dropdown/countries-dropdown.component';
import { HotelsGridComponent } from './hotels-grid/hotels-grid.component';

import { CountriesService } from './services/countries.service';
import { HotelsService } from './services/hotels.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CountriesDropdownComponent,
    HotelsGridComponent,
    EditModalComponent
  ],
  entryComponents: [
    EditModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
  ],
  providers: [CountriesService, HotelsService],
  bootstrap: [AppComponent],
})
export class AppModule {
  // constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
  //   this.matIconRegistry.addSvgIcon(
  //     'delete',
  //     this.domSanitizer.bypassSecurityTrustResourceUrl('assets/trash-icon.svg') // Modify the path accordingly
  //   );
  // }
}
