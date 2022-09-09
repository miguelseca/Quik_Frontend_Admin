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
  trips_today: number = 0;
  quick: number = 0;
  quickgreen: number = 0;
  quickxl: number = 0;
  quickassist: number = 0;
  quickconfort: number = 0;
  view: [number, number] = [600, 200];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  single = [
    { name: 'Quik', value: this.quick },
    { name: 'QuikGreen', value: this.quickgreen },
    { name: 'QuikConfort', value: this.quickconfort },
    {name: 'QuikXL',value: this.quickxl},
    { name: 'QuikAssist', value: this.quickassist},
  ];

  constructor(
    private tripService: TripsService,
    private clientService: ClientsService
  ) { }

  ngOnInit(): void {
    this.getAllTrips(); 
  }
  
  onSelect(data: any): void {
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
      console.log(t);

      this.trips = t;
      this.total_trips = this.trips.length;
      for (let i = 0; i < this.trips.length; i++) {
        this.total_cost += this.trips[i].cost;
        switch (this.trips[i].carClass) {
          case "Quik":
            this.quick += 1;
            break;
          case "QuikGreen":
            this.quickgreen += 1;  
            break;
            case "QuikConfort":
            this.quickconfort += 1;  
            break;
            case "QuikXL":
            this.quickxl += 1;  
            break;
            case "QuikAssist":
            this.quickassist += 1;  
            break;
          default: ""
            break;
        }
      }
      this.single = [
        { name: 'Quik', value: this.quick }, 
        { name: 'QuikGreen', value: this.quickgreen },
        { name: 'QuikConfort', value: this.quickconfort },
        { name: 'QuikXL', value: this.quickxl },
        { name: 'QuikAssist', value: this.quickassist },
      ]  
      
    });
  }

}
