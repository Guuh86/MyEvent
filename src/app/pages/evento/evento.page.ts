import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  location: any;

  private productId: string = null;
  public product: Product = {};
  public products = new Array<Product>();
  private productSubscription: Subscription;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private geolocation: Geolocation
  ) {

  }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params['id'];

    if (this.productId) this.loadProduct();
  }

  loadProduct() {
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
      console.log('Produto carregado do firebase');
      console.log('Iniciando geolocalização e directions...')
      this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.location = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        this.directionsService.route({
          origin: this.location,
          destination: this.product.localizacao,
          travelMode: 'DRIVING'
        }, (response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response);
          } else {
            window.alert('Falha ao obter direção ' + status);
          }
        });

        const MapOpt = {
          center: this.location,
          zoom: 15,
          disableDefaultUI: true
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, MapOpt);
        this.directionsDisplay.setMap(this.map);
        console.log('Rota carregada com sucesso!')
      })
    });
  }
}
