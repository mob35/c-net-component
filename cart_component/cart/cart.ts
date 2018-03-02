import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { CartModel } from './cart.model';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartData: CartModel = new CartModel();
  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().then((data) => {
      this.cartData = data;
      console.log(data);
    });
  }

  removeItem(index) {
    let title = '';
    let message = '';
    let cancel = '';
    let ok = '';
    title = 'ลบสินค้า';
    message = 'คุณต้องลบสินค้านี้ ออกจากตะกร้าสินค้า?';
    cancel = 'ยกเลิก';
    ok = 'ตกลง';
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      mode: 'ios',
      buttons: [
        {
          text: ok,
          cssClass: 'confirm',
          handler: () => {
            this.cartData.items.splice(index, 1);
            this.countPrice();
          }
        },
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

  countDelete(item) {
    if (item.qty > 1) {
      item.qty--;
      item.amount = item.product.price * item.qty;
    }
    this.countPrice();
  }

  countPlus(item) {
    item.qty++;
    item.amount = item.product.price * item.qty;
    this.countPrice();
  }

  countPrice() {
    this.cartData.qty = 0;
    this.cartData.amount = 0;
    this.cartData.items.forEach((e) => {
      this.cartData.qty += e.qty;
      this.cartData.amount += e.amount;
    });
    this.updateCart();
  }

  updateCart() {
    this.cartService.updateCart(this.cartData);
  }

  checkOut() {
    console.log(this.cartData);
    alert('thank you!');
  }

}
