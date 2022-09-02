import { Component, OnInit } from '@angular/core';
import Client from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import { TripsService } from 'src/app/services/trips.service';
import Trip from '../../models/trip';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  title = 'Quik';
  selected: Date | null | undefined;
  clients: Client[] = [];
  trips: Trip[] = [];
  total_trips: number = 0;
  total_cost: number = 0;

  view: [number, number] = [600, 200];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  single = [
    {
      name: 'Germany',
      value: 89,
    },
    {
      name: 'USA',
      value: 50,
    },
    {
      name: 'France',
      value: 720,
    },
    {
      name: 'UK',
      value: 62,
    },
  ];

  constructor(
    private tripService: TripsService,
    private clientService: ClientsService
  ) {}

  ngOnInit(): void {
    this.getAllTrips();
  }

  onSelect(data: any): void {
    this.getAllTrips();
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getAllTrips(): void {
    this.tripService.getAllTrips().subscribe((t) => {
      this.trips = t;
      this.total_trips = this.trips.length;
      for (let i = 0; i < this.trips.length; i++) {
        this.total_cost += this.trips[i].cost;
      }
    });
  }

  getAllClients(): void {
    this.clientService.getAllClients().subscribe((c) => (this.clients = c));
  }
}
