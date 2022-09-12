import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Client from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  title = 'Clients';
  clients: Client[] = [];
  displayedColumns = [
    'emailVerified', 'email', 'isBanned', 'phone', 'firstName', 'lastName',
    'paymentMethod', 'ban', 
  ];
  dataSource!: MatTableDataSource<Client>;

  @ViewChild('page') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientService: ClientsService,
    // private router: Router,
    private matDialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getAllClients().subscribe((c) => {
      this.dataSource = new MatTableDataSource(this.clients = c);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onBanClick(client: Client): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    // dialogConfig.height = '50%';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      entity: client.email,
      message: `Do you really want to ban ${client.email}?`,
    };

    const umDialog = this.matDialog.open(ConfirmComponent, dialogConfig);

    umDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.logSnacks(`${client.email} banned.`, 3000);
        this.clientService.banClient(client).subscribe((data) => {
          // this.router.navigateByUrl('/clients');
          this.getClients();
        });
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
