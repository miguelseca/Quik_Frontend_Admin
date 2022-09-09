import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Client from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  displayedColumns: string[] = [];

  toppings = this._formBuilder.group({
    email: true,
    phone: true,
    firstName: true,
    lastName: true,
    paymentMethod: true,
    emailVerified: true,
    isBanned: true,
  });

  constructor(
    private clientService: ClientsService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private matDialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getClients();

    this.displayedColumns = [
      'email',
      'phone',
      'firstName',
      'lastName',
      'paymentMethod',
      'emailVerified',
      'isBanned',
      'ban',
    ];
  }

  onChange(event: MatCheckboxChange): void {
    this.displayedColumns = [];
    if (this.toppings.value.email) this.displayedColumns.push('email');
    if (this.toppings.value.phone) this.displayedColumns.push('phone');
    if (this.toppings.value.firstName) this.displayedColumns.push('firstName');
    if (this.toppings.value.lastName) this.displayedColumns.push('lastName');
    if (this.toppings.value.paymentMethod)
      this.displayedColumns.push('paymentMethod');
    if (this.toppings.value.emailVerified)
      this.displayedColumns.push('emailVerified');
    if (this.toppings.value.isBanned) this.displayedColumns.push('isBanned');
    if (!this.displayedColumns.includes('ban'))
      this.displayedColumns.push('ban');
  }

  getClients(): void {
    this.clientService.getAllClients().subscribe((c) => (this.clients = c));
  }

  onBanClick(client: Client): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.height = '50%';
    dialogConfig.width = '50%';
    dialogConfig.data = {
      entity: client.email,
      message: `Do you really want to ban ${client.email}?`,
    };

    const umDialog = this.matDialog.open(ConfirmComponent, dialogConfig);

    umDialog.afterClosed().subscribe((result) => {
      if (result) {
        //remove banned client from list or not?
        //this.cargas = this.cargas.filter((item) => item !== carga);
        this.logSnacks(`${client.email} banned.`, 2000);
        this.clientService.banClient(client).subscribe((data) => {
          this.router.navigateByUrl('/clients');
          this.getClients();
        });
      }
    });
  }

  logSnacks(message: string, time: number): void {
    this.snackBar.open(message, '', { panelClass: 'snacks', duration: time });
  }
}
