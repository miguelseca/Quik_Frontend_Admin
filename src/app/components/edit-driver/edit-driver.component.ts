import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Driver, { Service } from 'src/app/models/driver';
import { DriversService } from 'src/app/services/drivers.service';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css'],
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
      firstName: new FormControl(this.driver.firstName, [Validators.required]),
      lastName: new FormControl(this.driver.lastName, [Validators.required]),
      phone: new FormControl(this.driver.phone, [Validators.required]),
      // email: new FormControl(this.driver.email, [Validators.required]),
      code: new FormControl(this.driver.service.code, [Validators.required]),
      carBrand: new FormControl(this.driver.service.carBrand, [
        Validators.required,
      ]),
      carModel: new FormControl(this.driver.service.carModel, [
        Validators.required,
      ]),
      licensePlate: new FormControl(this.driver.service.licensePlate, [
        Validators.required,
      ]),
      shift: new FormControl(this.driver.shift, [Validators.required]),
    });
  }

  onConfirmClick(): void {
    if (this.editForm.valid) {
      console.log('0: ' + JSON.stringify(this.editForm.value));
      const x: Service = {
        code: this.editForm.value.code,
        carBrand: this.editForm.value.carBrand,
        carModel: this.editForm.value.carModel,
        licensePlate: this.editForm.value.licensePlate,
      };
      const umDriver: Driver = {
        nif: this.driver.nif,
        phone: this.editForm.value.phone,
        email: this.driver.email,
        service: x,
        firstName: this.editForm.value.firstName,
        lastName: this.editForm.value.lastName,
        shift: this.editForm.value.shift,
      };
      console.log('1: ' + JSON.stringify(umDriver));

      this.driverService.updateDriver(umDriver).subscribe((data) => {
        this.dialogRef.close(umDriver);
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
