import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hotel } from '../models/hotel';
import { HotelsService } from '../services/hotels.service';
 
@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {
  hotel: Hotel;
  @Output() hotelUpdated = new EventEmitter<void>();
 
  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { hotel: Hotel },
    private hotelsService: HotelsService
  ) {
    this.hotel = { ...this.data.hotel };
  }
 
  onSaveChanges(): void {
    this.hotelsService.updateHotel(this.hotel).subscribe(
      () => {
        this.hotelUpdated.emit();
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error updating hotel:', error);
      }
    );
  }
}