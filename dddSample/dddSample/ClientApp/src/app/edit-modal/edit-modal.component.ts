import { Component, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hotel } from '../models/hotel';
import { HotelsService } from '../services/hotels.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotelsGridComponent } from '../hotels-grid/hotels-grid.component';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent {
  hotel: Hotel;
  @Output() hotelUpdated = new EventEmitter<void>();

  @ViewChild(HotelsGridComponent) hotelsGridComponent!: HotelsGridComponent;

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { hotel: Hotel },
    private hotelsService: HotelsService,
    private snackBar: MatSnackBar
  ) {
    this.hotel = { ...this.data.hotel };
  }

  onSaveChanges(): void {
    this.hotelsService.updateHotel(this.hotel).subscribe(
      (hotel) => {
        console.log('Hotel updated successfully:', hotel);
        this.hotelUpdated.emit();
        this.dialogRef.close(this.hotel);
      },
      (error) => {
        console.error('Error updating hotel:', error);
      }
    );
  }

  onCancelDialog(): void {
    this.dialogRef.close();
  }
}
