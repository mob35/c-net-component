import { OmiseProvider } from './../../providers/omise/omise';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  isAndroid: boolean = false;
  omiseKey: any = {
    'publicKey': 'pkey_test_5asc1ucstk1imcxnhy7',
    'secretKey': 'skey_test_5asc1uct2yat7bftf3j'
  };
  payment: any = {
    paymenttype: 'Credit card',
    creditno: '',
    creditname: '',
    expdate: '',
    creditcvc: ''
  };
  constructor(
    platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public alert: AlertController,
    private omiseProvider: OmiseProvider
  ) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  onAlert(title, massage, button) {
    let alert = this.alert.create({
      title: title,
      subTitle: massage,
      mode: 'ios',
      buttons: [button],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  onBanking(): Promise<any> {
    return new Promise((resolve, reject) => {

      let loader = this.loading.create({
        content: "Please wait...",
        duration: 3000
      });
      loader.present();

      this.omiseProvider.getTokenByCredit(this.omiseKey, this.payment).then((res: any) => {
        loader.dismiss();
        this.onAlert('การชำระเงิน', 'บัตรเครดิตถูกต้อง', 'ตกลง');
        resolve(true);
      }, (err) => {
        loader.dismiss();
        this.onAlert('การชำระเงิน', 'บัตรเครดิตไม่ถูกต้อง', 'ตกลง');
        resolve(false);
      });

    });
  }

  creditFormat() {
    // let pattern = new RegExp('[0-9]{1,30}');
    if (this.payment.creditno) {
      if (this.payment.creditno.length > 16) {
        setTimeout(() => {
          this.payment.creditno = this.payment.creditno.substr(0, 16);
        }, 0);
      }
    }

    if (this.payment.creditcvc) {
      if (this.payment.creditcvc.length > 3) {
        setTimeout(() => {
          this.payment.creditcvc = this.payment.creditcvc.substr(0, 3);
        }, 0);
      }
    }

    if (this.payment.expdate) {
      setTimeout(() => {
        // this.paymentDetail.expdate = pattern.exec(this.paymentDetail.expdate);
        if (this.payment.expdate && this.payment.expdate.length === 4) {
          if (this.payment.expdate.indexOf('/') === -1) {
            this.payment.expdate = this.payment.expdate.substr(0, 2) + '/' + this.payment.expdate.substr(2, 4);
          }
          this.payment.expdate = this.payment.expdate;
        } else if (this.payment.expdate && this.payment.expdate.length > 5) {
          setTimeout(() => {
            this.payment.expdate = this.payment.expdate.substr(0, 5);
          }, 0);
        }
      }, 0);
    }
  }
}
