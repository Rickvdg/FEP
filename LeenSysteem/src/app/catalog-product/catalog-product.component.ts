import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AngularFireDatabase} from 'angularfire2/database-deprecated';
import { MatDialogRef } from '@angular/material';

/**
 * This component is used by the lender to add new products to the database.
 */

@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.css']
})

export class CatalogProductComponent implements OnInit {

  productForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CatalogProductComponent>, private db: AngularFireDatabase, private formBuilder: FormBuilder) { }

  /**
   * Adds the product to the database with the data from the form with a new id (key).
   */
  createProduct(data: any) {
    this.db.list('/catalog-products').push(data).key;
  }


  /**
   * Checks if data is according to the validators,
   * takes the data from the form,
   * calls function to add product to database,
   * closes popup.
   */
  submitForm() {
    if (this.productForm.status === 'VALID') {
      const data = this.productForm.value;
      this.createProduct(data);
      this.dialogRef.close();
    }
  }

  /**
   * Builds a form with all variables that need to be entered,
   * with their initial data and the validators.
   */
  private buildForm() {
    this.productForm = this.formBuilder.group({
      active: ['true'],
      category: [, Validators.required],
      description: [, Validators.required],
      image: [, ],
      name: [, Validators.required],
      productnumber: [, Validators.required],
      qty: [, [Validators.min(0), Validators.required, Validators.pattern('^\\d+$')]],
      tags: [, Validators.required]
    });
  }

  /**
   * Closes popup.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.buildForm();
  }
}
