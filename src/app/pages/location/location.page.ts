import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  
  private productId: string = null;
  public product: Product = {};
  public products = new Array<Product>();
  private productSubscription: Subscription;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  latitude: number;
  longitude: number;
  geo: any;

  location: any;


  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private geolocation: Geolocation
  ) {
    this.productSubscription = this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  ngOnInit() {
    this.initMapAndGetLocation();
  }
  
  initMapAndGetLocation() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.location = new google.maps.LatLng(
          resp.coords.latitude, 
          resp.coords.longitude
          );
          console.log('Localização atual obtida com sucesso!!' + this.location);
        const MapOpt = {
          center: this.location,
          zoom: 15,
          disableDefaultUI: true
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, MapOpt);
        this.directionsDisplay.setMap(this.map);
      })
    }

  
}
