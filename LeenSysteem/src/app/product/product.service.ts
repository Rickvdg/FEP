import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database-deprecated';

export class CatalogProduct {
  active;
  category;
  description;
  id;
  image;
  name;
  productnumber;
  qty;
  tags;
}

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  createProduct(): FirebaseObjectObservable<CatalogProduct> {
    const productDefault = new CatalogProduct();
    const productKey = this.db.list('/catalog-products').push(productDefault).key;
    return this.db.object('/catalog-products/' + productKey);
  }

  updateProduct(product: FirebaseObjectObservable<CatalogProduct>, data: any) {
    return product.update(data);
  }

}
