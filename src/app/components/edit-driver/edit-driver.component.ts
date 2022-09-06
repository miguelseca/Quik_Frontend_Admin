import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Driver from 'src/app/models/driver';
import { DriversService } from 'src/app/services/drivers.service';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent implements OnInit {

  driver: Driver;
  editForm: any;
  message: string = 'Edit Driver';
  confirmButtonText = 'Confirm changes';
  cancelButtonText = 'Cancel';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private driverService: DriversService,
    private dialogRef: MatDialogRef<EditDriverComponent>
  ) {
    this.driver = data.driver;
  }


  ngOnInit(): void {


    this.editForm = new FormGroup({
      firstName: new FormControl(this.driver.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
      lastName: new FormControl(this.driver.lastName, [Validators.required,  Validators.minLength(3), Validators.maxLength(3)]),
      shift: new FormControl(this.driver.shift, [Validators.required]),
    });
  }

  onConfirmClick(): void {
    if (this.editForm.valid) {
    const umDriver: Driver = {
      nif: this.driver.nif,
      phone: this.driver.phone,
      email: this.driver.email,
      service: this.driver.service,
      firstName: this.editForm.value.firstName,
      lastName: this.editForm.value.lastName,
      shift: this.editForm.value.shift,

    };

    this.driverService.updateDriver(umDriver).subscribe((data) => {
      this.dialogRef.close(umDriver);
    });
  }
}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
