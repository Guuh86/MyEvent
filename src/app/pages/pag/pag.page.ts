import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


declare var paypal;

@Component({
  selector: 'app-pag',
  templateUrl: './pag.page.html',
  styleUrls: ['./pag.page.scss'],
})
export class PagPage implements OnInit {
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
              currency_code: 'USD',
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
