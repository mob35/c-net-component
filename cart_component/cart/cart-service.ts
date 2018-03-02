import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartModel } from '../../pages/cart/cart.model';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CartProvider Provider');
  }

  private handleError(error: any): Promise<any> {
    // this.log.errorService('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getCart() {
    // return window.localStorage.getItem('cart@') ? JSON.parse(window.localStorage.getItem('cart@')) : null;
    return this.http.get('./assets/json/cart.json')
      .toPromise()
      .then(response => response as CartModel)
      .catch(this.handleError);
  }

  addToCart(item) {
    let cart = JSON.parse(window.localStorage.getItem('cart@'));

    if (cart && cart.items && cart.items.length > 0) {
      let product = cart.items.filter((obj) => obj.product._id === item.product._id);
      let product_remark = product.filter((obj) => obj.remark === item.remark);

      if (product_remark && product_remark.length > 0) {
        product_remark[0].qty += item.qty;
      } else {
        cart.items.push(item);
      }

    } else {
      cart = {
        items: []
      }
      cart.items.push(item);
    }

    cart.qty = 0;
    cart.amount = 0;
    cart.items.forEach((e) => {
      e.amount = e.qty * e.product.price;
      cart.qty += e.qty;
      cart.amount += e.amount;
    });

    window.localStorage.setItem('cart@', JSON.stringify(cart));
    return cart;
  }

  getCount() {
    let badge = 0;
    let cart = window.localStorage.getItem('cart@') ? JSON.parse(window.localStorage.getItem('cart@')) : {};
    if (cart && cart.items && cart.items.length > 0) {
      badge = cart.qty;
    }
    return badge;
  }

  updateCart(item) {
    window.localStorage.setItem('cart@', JSON.stringify(item));
    return;
  }

  clearCart() {
    window.localStorage.removeItem('cart@');
    return;
  }

}
