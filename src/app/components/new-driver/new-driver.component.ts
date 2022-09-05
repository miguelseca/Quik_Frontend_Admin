import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Driver from '../../models/driver';
import { DriversService } from '../../services/drivers.service';

@Component({
  selector: 'app-new-driver',
  templateUrl: './new-driver.component.html',
  styleUrls: ['./new-driver.component.css'],
})
export class NewDriverComponent implements OnInit {
  driverForm: any;

  constructor(private driverService: DriversService, private router: Router) {}

  ngOnInit(): void {
    this.driverForm = new FormGroup({
      nif: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      code: new FormControl(''),
      carBrand: new FormControl(''),
      carModel: new FormControl(''),
      licensePlate: new FormControl(''),
      shift: new FormControl(''),
    });
  }

  onSubmit() {
    const driver: Driver = {
      nif: this.driverForm.value.nif,
      firstName: this.driverForm.value.firstName,
      lastName: this.driverForm.value.lastName,
      phone: this.driverForm.value.phone,
      email: this.driverForm.value.email,

      service: {
        code: this.driverForm.value.code,
        carBrand: this.driverForm.value.carBrand,
        carModel: this.driverForm.value.carModel,
        licensePlate: this.driverForm.value.licensePlate,
      },
      shift: this.driverForm.value.shift,
    };

    this.driverService.createDriver(driver).subscribe((data) => {
      this.router.navigateByUrl('/driver');
    });
  }
}
