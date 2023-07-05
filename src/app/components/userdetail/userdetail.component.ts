import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as leaflet from 'leaflet';
import { Coordinate } from 'src/app/interface/coordinates.interface';
//import { Response } from 'src/app/interface/response.interface';
import { User } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css'],
})
export class UserdetailComponent implements OnInit {
  // response: Response;
  user: User;
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save Changes' | 'Edit' = 'Edit';
  marker = new leaflet.Icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconSize: [32, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = <User>(
      this.activatedRoute.snapshot.data['resolvedResponse'].results[0]
    );
    console.log(this.user);
    this.loadMap(this.user.coordinate);

    // this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
    //   this.userService
    //     .getUser(params.get(`uuid`)!)
    //     .subscribe((response: any) => {
    //       this.response = response;
    //     });
    // });
  }
  changeMode(mode?: 'edit' | 'locked'): void {
    console.log(mode);
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Edit' ? 'Save Changes' : 'Edit';

    if (mode === 'edit') {
      //logic to update user on the backend
      console.log('Updating user information on the backend');
    }
  }

  private loadMap(coordinate: Coordinate): void {
     const map = leaflet.map('map', {
       center: [coordinate.latitude, coordinate.longitude],
       zoom: 8,
     });
     const mainLayer = leaflet.tileLayer(
       'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
       {
         tileSize: 512,
         zoomOffset: -1,
         minZoom: 1,
         maxZoom: 30,
         crossOrigin: true,
         attribution:
           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
       }
     );
    mainLayer.addTo(map);
    const marker = leaflet.marker([coordinate.latitude, coordinate.longitude], {
      icon: this.marker,
    });
    marker
      .addTo(map)
      .bindPopup(`${this.user.firstName}'s Location`)
      .openPopup();
  }
}
