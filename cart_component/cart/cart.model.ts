export class CartModel {
    items: Array<ItemCartModel>;
    qty: number;
    amount: number;
}

export class ItemCartModel {
    product: ProductCartModel = new ProductCartModel();
    qty: number;
    amount: number;
}

export class ProductCartModel {
    name: string;
    price: number;
    images: Array<string>;
}

export class ShippingModel {
    ref: ShippingItemModel = new ShippingItemModel();
    price: number;
}

export class ShippingItemModel {
    name: string
}