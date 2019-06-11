import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {
  private productId: string = null;
  public product: Product = {};
  public products = new Array<Product>();
  private productSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {
    
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
}
