import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Driver from 'src/app/models/driver';
import { DriversService } from 'src/app/services/drivers.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { EditDriverComponent } from '../edit-driver/edit-driver.component';
import { NewDriverComponent } from '../new-driver/new-driver.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})
export class DriversComponent implements OnInit {
  drivers: Driver[] = [];
  displayedColumns = [
    'nif', 'firstName', 'lastName', 'phone', 'email',
    'code', 'carBrand', 'carModel', 'licensePlate', 'shift',
    'lastTrip', 'edit', 'delete',
  ];
  dataSource!: MatTableDataSource<Driver>;

  @ViewChild('page') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private driversService: DriversService,
    private matDialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getDrivers();
  }

  createDriver() {
    const umDialog = this.matDialog.open(NewDriverComponent);
    umDialog.afterClosed().subscribe((result) => {
      console.log(result);
      
      if (result) {
        this.logSnacks(`Driver added to database`, 2000);
        this.getDrivers();
      } else {
        this.logSnacks(`Cancelled.`, 3000);
      }
    });
  }

  getDrivers(): void {
    this.driversService.getDrivers().subscribe((c) => {
      this.dataSource = new MatTableDataSource((this.drivers = c));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onDeleteClick(driver: Driver): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    // dialogConfig.height = '50%';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      entity: driver.email,
      message: `Do you really want to delete ${driver.email}?`,
    };

    const umDialog = this.matDialog.open(ConfirmComponent, dialogConfig);

    umDialog.afterClosed().subscribe((result) => {
      if (result) {
        // this.drivers = this.drivers.filter((item) => item !== driver);
        this.driversService.deleteDriver(driver).subscribe((data) => {
          this.logSnacks(`${driver.email} was deleted.`, 3000);
          // this.router.navigateByUrl('/drivers');
          this.getDrivers();
        });
      }
    });
  }

  onEditClick(driver: Driver): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    // dialogConfig.height = '50%';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      driver: driver,
    };
    const umDialog = this.matDialog.open(EditDriverComponent, dialogConfig);
    umDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.logSnacks(`${driver.email} data updated.`, 3000);
        this.getDrivers();
      } else {
        this.logSnacks(`Cancelled.`, 3000);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  logSnacks(message: string, time: number): void {
    this.snackBar.open(message, '', { panelClass: 'snacks', duration: time });
  }
}
