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


  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private geolocation: Geolocation,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      
    })
  }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params['id'];

    if (this.productId) this.loadProduct();
  }

  loadProduct() {
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
    });
  }

  initMap() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const location = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        const MapOpt = {
          center: location,
          zoom: 15,
          disableDefaultUI: true
        }
        this.directionsService.route({
          origin: location,
          destination: this.product.local,
          travelMode: 'WALKING'
        }, (response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response);
          } else {
            window.alert('Falha ao obter direção ' + status);
          }
        });
        this.map = new google.maps.Map(this.mapElement.nativeElement, MapOpt);
        this.directionsDisplay.setMap(this.map);
      })
  }
}
