import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-pag',
  templateUrl: './pag.page.html',
  styleUrls: ['./pag.page.scss'],
})
export class PagPage implements OnInit {

  constructor(
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
  }

  pagOne(){
    this.iab.create('https://www.mercadopago.com/mlb/checkout/start?pref_id=182112476-7e1d6c3a-2dc6-4de8-8ea2-76a6cc2f2f58');
  }

  pagFive(){
    this.iab.create('https://www.mercadopago.com/mlb/checkout/start?pref_id=182112476-cc34ce84-c0fc-419b-a6f1-8afeb08d0dfc')
  }

  pagTen(){
    this.iab.create('https://www.mercadopago.com/mlb/checkout/start?pref_id=182112476-c7e571b4-19f4-4161-a42c-a1d5d03dbbbc')
  }

  pagFifteen(){
    this.iab.create('https://www.mercadopago.com/mlb/checkout/start?pref_id=182112476-b33777f6-8a78-477e-a78d-8e97efd4cac6')
  }

  pagTwFive(){
    this.iab.create('https://www.mercadopago.com/mlb/checkout/start?pref_id=182112476-196eda4c-bd38-47d1-880b-935cd93361c0')
  }

  pagFifty(){
    this.iab.create('https://www.mercadopago.com/mlb/checkout/start?pref_id=182112476-cc3fb9e9-aaa5-4ab9-b03c-0eddd5f9110d')
  }

}
