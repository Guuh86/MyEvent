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

  latitude: number;
  longitude: number;

  private productId: string = null;
  public product: Product = {};
  public products = new Array<Product>();
  private productSubscription: Subscription;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private geolocation: Geolocation
  ) { }

  loadProduct() {
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
    });
  }

  ngOnInit() {
    this.initMapAndCalculateRoute();
    
    this.productId = this.activatedRoute.snapshot.params['id'];

    if (this.productId) this.loadProduct();
  }


  initMapAndCalculateRoute() {
    const geo = new google.maps.LatLng( -2.947339, -41.73142 )
    const MapOpt = {
      center: geo,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, MapOpt);
    this.directionsDisplay.setMap(this.map);
  }
}


