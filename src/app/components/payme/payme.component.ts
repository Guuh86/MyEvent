import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var paypal;

@Component({
  selector: 'app-payme',
  templateUrl: './payme.component.html',
  styleUrls: ['./payme.component.scss'],
})
export class PaymeComponent implements OnInit {
  @ViewChild('paypal') paypalElement: ElementRef;

  product = {
    price: 1.00,
    description: 'Doação de R$ 1,00 para o MyEvent'
  };
  paidFor: boolean;

  constructor() { }

  ngOnInit() {
    paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            description:this.product.description,
            amount: {
              currency_code: 'BRL',
              value: this.product.price 
            }
          }]
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        this.paidFor = true;
        console.log(order);
      },
      onError: err => {
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);
  }

}
