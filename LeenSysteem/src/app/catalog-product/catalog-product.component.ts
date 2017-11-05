import { Component, OnInit } from '@angular/core';
import { ProductService, CatalogProduct } from '../product/product.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.css']
})


export class CatalogProductComponent implements OnInit {

  product: any;
  productForm: FormGroup;

  constructor(private productService: ProductService, private formBuilder: FormBuilder) { }

  startNewCatalogProduct() {
    this.product = this.productService.createProduct();
    this.buildForm();
  }

  saveProductChanges() {
    if (this.productForm.status !== 'VALID') {
      console.log('form is nog valid, cannot save to database');
      return;
    }

    const data = this.productForm.value;
    this.productService.updateProduct(this.product, data);
  }

  submitForm() {
    this.product = this.productService.createProduct();
    const data = this.productForm.value;
    this.productService.updateProduct(this.product, data);
  }

  private buildForm() {
    this.productForm = this.formBuilder.group({
      active: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      id: ['', ],
      image: ['', Validators.required],
      name: ['', Validators.required],
      productnumber: ['', Validators.required],
      qty: ['', [Validators.min(0), Validators.required]],
      tags: ['', Validators.required]
    });

    this.product.subscribe(product => {
      this.productForm.patchValue(product);
    });

  }
  ngOnInit() {
    this.startNewCatalogProduct();
  }

}
