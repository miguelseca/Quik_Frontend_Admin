import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CONFIG } from 'src/assets/config';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  confirmButtonText = CONFIG.CONFIRM_BUTTON_TEXT;
  cancelButtonText = CONFIG.CANCEL_BUTTON_TEXT;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmComponent>
  ) {}
  ngOnInit(): void {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
