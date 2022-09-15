import { Component, OnInit } from '@angular/core';
import Client from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import { TripsService } from 'src/app/services/trips.service';
import Trip from '../../models/trip';
import * as  moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  title = 'Quik Dashboard';
  selected: Date | null | undefined;
  clients: Client[] = [];
  trips: Trip[] = [];
  total_trips: number = 0;
  total_cost: number = 0;
  total_users: number = 0;
  trips_today: number = 0;
  quick: number = 0;
  quickgreen: number = 0;
  quickxl: number = 0;
  quickassist: number = 0;
  quickconfort: number = 0;
  view: [number, number] = [600, 200];
  single = [];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  //======================================================Bar Chart======================================================
  
  single2: any[];
  multi: any[];

  view2: any[] = [700, 400];

  morning: number = 0
  afternoon: number = 0
  night: number = 0

  showXAxis = true;
  showYAxis = true;
  gradient2 = false;
  showLegend2 = true;
  showXAxisLabel = true;
  xAxisLabel = 'Hour';
  showYAxisLabel = true;
  yAxisLabel = 'Trips';



  

  constructor(
    private tripService: TripsService,
    private clientService: ClientsService
  ) {}

  ngOnInit(): void {
    this.getAllTrips();
    this.getClients();
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

  getClients(): void {
    this.clientService.getAllClients().subscribe((c) => {
      console.log("clients:", c)
      this.clients = c
      this.total_users = c.length;
    });
  }
  getAllTrips(): void {
    this.tripService.getAllTrips().subscribe((t) => {
      console.log(t)
      this.trips = t;
      this.total_trips = this.trips.length;
      for (let i = 0; i < this.trips.length; i++) {
        this.total_cost += this.trips[i].cost;
        switch (this.trips[i].carClass) {
          case 'Quik':
            this.quick += 1;
            break;
          case 'QuikGreen':
            this.quickgreen += 1;
            break;
          case 'QuikConfort':
            this.quickconfort += 1;
            break;
          case 'QuikXL':
            this.quickxl += 1;
            break;
          case 'QuikAssist':
            this.quickassist += 1;
            break;
          default:
            '';
            break;
        }
        
        let tripHours = moment(this.trips[i].createdAt).hours();

        if (tripHours >= 0 && tripHours < 8) {
          console.log("Morning")
          this.morning++;

        } else if (tripHours >= 8 && tripHours < 16) {
          console.log("Afternoon")
          this.afternoon++;

        } else if (tripHours >= 16 && tripHours < 24) {
          console.log("Night")
          this.night++;
        }
      }

   


      console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))

      this.single = [
        { name: 'Quik', value: this.quick },
        { name: 'QuikGreen', value: this.quickgreen },
        { name: 'QuikConfort', value: this.quickconfort },
        { name: 'QuikXL', value: this.quickxl },
        { name: 'QuikAssist', value: this.quickassist },
      ];
      this.single2 = [
        { name: '[ 0h - 8h ] ', value: this.morning },
        { name: '[ 8h - 16h ]', value: this.afternoon },
        { name: '[ 16h - 24h ]', value: this.night },
        
    ]});
  }
} 
