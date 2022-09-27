import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import Driver from 'src/app/models/driver';
import { DriversService } from 'src/app/services/drivers.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChildren(MapInfoWindow) infoWindow: QueryList<MapInfoWindow>;
  // @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  title = 'Maps';
  center: google.maps.LatLngLiteral;
  markerPositions = [];
  zoom = 12;

  drivers: Driver[] = [];

  constructor(
    private driverService: DriversService
  ) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    this.addMarkers();
  }

  addMarkers() {
    this.driverService.getDrivers().subscribe((data) => {
      this.drivers = data;
      this.drivers.forEach((driver) => {
        this.markerPositions.push(new google.maps.Marker({
          position: {
            lat: driver.currentLocation[0],
            lng: driver.currentLocation[1],
          },
          draggable: false,
          title: `S:${driver.service.code} T:${driver.shift}`,
          label: `${driver.service.licensePlate}`,
        }));
      });
    });
  }

  openInfoWindow(marker: MapMarker, windowIndex: number) {
    /// stores the current index in forEach
    let curIdx = 0;
    this.infoWindow.forEach((window: MapInfoWindow) => {
      if (windowIndex === curIdx) {
        content:  "<p>Marker Location: </p>";
        window.open(marker);
        curIdx++;
      } else {
        curIdx++;
      }
    });
  }
}