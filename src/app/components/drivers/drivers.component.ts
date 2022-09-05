import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Driver from 'src/app/models/driver';
import { DriversService } from 'src/app/services/drivers.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})
export class DriversComponent implements OnInit {
  drivers: Driver[] = [];
  displayedColumns: string[] = [];

  toppings = this._formBuilder.group({
    nif: true,
    firstName: true,
    lastName: true,
    phone: true,
    email: true,
    code: true,
    carBrand: true,
    carModel: true,
    licensePlate: true,
    shift: true,
    lastTrip: true,
  });

  constructor(
    private driversService: DriversService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private matDialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getDrivers();

    this.displayedColumns = [
      'nif',
      'firstName',
      'lastName',
      'phone',
      'email',
      'code',
      'carBrand',
      'carModel',
      'licensePlate',
      'shift',
      'lastTrip',
      'edit',
      'delete',
    ];
  }

  onChange(event: MatCheckboxChange): void {
    this.displayedColumns = [];
    if (this.toppings.value.nif) this.displayedColumns.push('nif');
    if (this.toppings.value.firstName) this.displayedColumns.push('firstName');
    if (this.toppings.value.lastName) this.displayedColumns.push('lastName');
    if (this.toppings.value.phone) this.displayedColumns.push('phone');
    if (this.toppings.value.email) this.displayedColumns.push('email');
    if (this.toppings.value.code) this.displayedColumns.push('code');
    if (this.toppings.value.carBrand) this.displayedColumns.push('carBrand');
    if (this.toppings.value.carModel) this.displayedColumns.push('carModel');
    if (this.toppings.value.licensePlate)
      this.displayedColumns.push('licensePlate');
    if (this.toppings.value.shift) this.displayedColumns.push('shift');
    if (this.toppings.value.lastTrip) this.displayedColumns.push('lastTrip');

    if (!this.displayedColumns.includes('edit'))
      this.displayedColumns.push('edit');
    if (!this.displayedColumns.includes('delete'))
      this.displayedColumns.push('delete');
  }

  getDrivers(): void {
    this.driversService.getDrivers().subscribe((c) => (this.drivers = c));
  }

  onDeleteClick(driver: Driver): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.height = '50%';
    dialogConfig.width = '50%';
    dialogConfig.data = {
      entity: driver.email,
      message: 'Do you really want to delete',
    };

    const umDialog = this.matDialog.open(ConfirmComponent, dialogConfig);

    umDialog.afterClosed().subscribe((result) => {
      if (result) {

        this.drivers = this.drivers.filter((item) => item !== driver);
        this.logSnacks(`${driver.email} was deleted.`, 2000);
        this.driversService.deleteDriver(driver).subscribe((data) => {
          this.router.navigateByUrl('/drivers');
        });
      }
    });
  }

  onEditClick(driver: Driver): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.height = '50%';
    dialogConfig.width = '50%';
    dialogConfig.data = {
      driver: driver,
    };
    // const umDialog = this.matDialog.open(EditCargaComponent, dialogConfig);
    // umDialog.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.logSnacks(`${carga.AWB} atualizado.`, 2000);
    //     this.cargas = this.cargas.filter((item) => item.AWB !== result.AWB);
    //     this.cargas.unshift(result);
    //   } else {
    //     this.logSnacks(`atualização cancelada.`, 2000);
    //   }
    // });
  }

  logSnacks(message: string, time: number): void {
    this.snackBar.open(message, '', { panelClass: 'snacks', duration: time });
  }
}
