import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';

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
    private geolocation: Geolocation,
    private platform: Platform
  ) {
    this.productSubscription = this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  ngOnInit() {
      this.initMap();
      this.showRoute();
      if (this.productId) this.loadProduct();    
  }

  loadProduct() {
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
    });
  }

  initMap() {
    this.geolocation.getCurrentPosition()
      .then( (resp) => {
        this.location = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        const MapOpt = {
          center: new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude),
          zoom: 15,
          disableDefaultUI: true
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, MapOpt);
        this.directionsDisplay.setMap(this.map);
      })
  }

  showRoute(){
    this.directionsService.route({
      origin: 'Avenida Marquês de Paranguá, 947, Parnaíba',
      destination: this.product.local,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Falha ao obter direção ' + status);
      }
    });
    console.log(this.product.local);
  }
  
  

  
}
