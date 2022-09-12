import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Driver, { Service } from 'src/app/models/driver';
import { DriversService } from '../../services/drivers.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-driver',
  templateUrl: './new-driver.component.html',
  styleUrls: ['./new-driver.component.css'],
})
export class NewDriverComponent implements OnInit {
  driverForm!: FormGroup;
  driver: Driver;

  constructor(
    private driverService: DriversService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewDriverComponent>
  ) {}

  ngOnInit(): void {
    this.driverForm = new FormGroup({
      nif: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      email: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      carBrand: new FormControl('', [Validators.required]),
      carModel: new FormControl('', [Validators.required]),
      licensePlate: new FormControl('', [Validators.required]),
      shift: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.driverForm.valid) {
      console.log('0: ' + JSON.stringify(this.driverForm.value));
      const x: Service = {
        code: this.driverForm.value.code,
        carBrand: this.driverForm.value.carBrand,
        carModel: this.driverForm.value.carModel,
        licensePlate: this.driverForm.value.licensePlate,
      };
      console.log('cheguei');
      const umDriver: Driver = {
        nif: this.driverForm.value.nif,
        firstName: this.driverForm.value.firstName,
        lastName: this.driverForm.value.lastName,
        phone: this.driverForm.value.phone,
        email: this.driverForm.value.email,
        service: x,
        shift: this.driverForm.value.shift,
      };
      console.log('1: ' + JSON.stringify(umDriver));

      this.driverService.createDriver(umDriver).subscribe((data) => {
        this.dialogRef.close(umDriver);
      });
    }
  }
}
