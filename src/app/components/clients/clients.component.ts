import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Client from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
//import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  displayedColumns: string[] = [];

  toppings = this._formBuilder.group({
    AWB: true,
    origin: true,
    destination: true,
    pieces: true,
    weight: true,
    volume: true,
    description: true,
    flight: true,
  });

  constructor(
    private clientservice: ClientsService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private matDialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.getClients();

    this.displayedColumns = [
      'AWB',
      'origin',
      'destination',
      'pieces',
      'weight',
      'volume',
      'description',
      'flight',
      'edit',
      'delete',
    ];
  }









  onChange(event: MatCheckboxChange): void {
    this.displayedColumns = [];
    if (this.toppings.value.AWB) this.displayedColumns.push('AWB');
    if (this.toppings.value.origin) this.displayedColumns.push('origin');
    if (this.toppings.value.destination)
      this.displayedColumns.push('destination');
    if (this.toppings.value.pieces) this.displayedColumns.push('pieces');
    if (this.toppings.value.weight) this.displayedColumns.push('weight');
    if (this.toppings.value.volume) this.displayedColumns.push('volume');
    if (this.toppings.value.description)
      this.displayedColumns.push('description');
    if (this.toppings.value.flight) this.displayedColumns.push('flight');
    if (!this.displayedColumns.includes('edit'))
      this.displayedColumns.push('edit');
    if (!this.displayedColumns.includes('delete'))
      this.displayedColumns.push('delete');
  }

  getClients(): void {
    this.clientservice.getAllClients().subscribe((c) => (this.clients = c));
  }

  onDeleteClick(client: Client): void {
  };

  onEditClick(client: Client): void {
  };



  // onDeleteClick(carga: Carga): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.hasBackdrop = true;
  //   dialogConfig.height = '50%';
  //   dialogConfig.width = '50%';
  //   dialogConfig.data = {
  //     entity: carga.AWB,
  //     message: 'Do you really want to delete',
  //   };

  //   const umDialog = this.matDialog.open(ConfirmComponent, dialogConfig);

  //   umDialog.afterClosed().subscribe((result) => {
  //     if (result) {
  //       carga.isActive = false;

  //       this.cargas = this.cargas.filter((item) => item !== carga);
  //       this.logSnacks(`${carga.AWB} cancelada.`, 2000);
  //       this.cargaService.updateCarga(carga).subscribe((data) => {
  //         this.router.navigateByUrl('/cargas');
  //       });
  //     }
  //   });
  // }

  // onEditClick(carga: Carga): void {
  //   console.log('on edit click');
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.hasBackdrop = true;
  //   dialogConfig.height = '50%';
  //   dialogConfig.width = '50%';
  //   dialogConfig.data = {
  //     carga: carga,
  //   };
  //   const umDialog = this.matDialog.open(EditCargaComponent, dialogConfig);
  //   umDialog.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.logSnacks(`${carga.AWB} atualizado.`, 2000);
  //       this.cargas = this.cargas.filter((item) => item.AWB !== result.AWB);
  //       this.cargas.unshift(result);
  //     } else {
  //       this.logSnacks(`atualização cancelada.`, 2000);
  //     }
  //   });
  // }

  // logSnacks(message: string, time: number): void {
  //   this.snackBar.open(message, '', { panelClass: 'snacks', duration: time });
  // }





}
