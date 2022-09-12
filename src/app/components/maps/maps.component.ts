import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  display : any;
  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 8,
    disableDefaultUI: true,
  };
  markers = [];
  infoContent = '';
  drivers: Driver[] = [];


  constructor(
    private driverService: DriversService
  ) {}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    this.getalldrivers();
  }

  getalldrivers() {
    this.driverService.getDrivers().subscribe((data) => {
      this.drivers = data;
      this.drivers.forEach(item => {
        this.markers.push(new google.maps.Marker({
          position: {
            lat: item.currentLocation[0],
            lng: item.currentLocation[1]
          },
          draggable: false,
          label: item.firstName
        }));
      });

    });

  }
  
  moveMap(event: google.maps.MapMouseEvent) {
    if(event.latLng!= null)
    this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if(event.latLng != null)
    this.display = event.latLng.toJSON();
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.info.open(marker);
  }
}