import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OmiseProvider } from '../payment/omise';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the BankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-banking',
  templateUrl: 'banking.html',
})
export class BankingPage {
  bankingType: string = '';
  omiseKey: any = {
    'publicKey': 'pkey_test_5asc1ucstk1imcxnhy7',
    'secretKey': 'skey_test_5asc1uct2yat7bftf3j'
  };
  bankData = [
    {
      name: "BAY",
      image: "./assets/imgs/Internet Banking/krungsri.png",
      value: "internet_banking_bay"
    },
    {
      name: "BBL",
      image: "./assets/imgs/Internet Banking/Bualuang.png",
      value: "internet_banking_bbl"
    },
    {
      name: "KTB",
      image: "./assets/imgs/Internet Banking/ktb.png",
      value: "internet_banking_ktb"
    },
    {
      name: "SCB",
      image: "./assets/imgs/Internet Banking/scb.png",
      value: "internet_banking_scb"
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private omiseProvider: OmiseProvider,
    private iab: InAppBrowser
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankingPage');
  }

  clickConfirmed(e) {
    this.bankingType = e;
    let index = parseInt(e);
    // this.bankData[index].value;
    // console.log(this.bankData[index].value);
    // console.log(this.bankingType);
    let bank = this.bankData[index].value;
    this.omiseProvider.payBanking(this.omiseKey, bank, 1000).then((data) => {
      console.log(data);
      // let resss = data ? data : { authorize_uri: '' };
      let result = JSON.parse(JSON.stringify(data));
      let browser = this.iab.create(result.authorize_uri);
      browser.show();
    }, (err) => {
      console.log(err);
    });
  }
}
