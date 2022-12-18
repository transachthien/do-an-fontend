import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductDTO } from '../dto/productDTO';
import { HelperService } from '../helper.service';
import { ProductService } from '../product.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public Products: ProductDTO[] = [];
  public editProduct!: ProductDTO;
  public deleteProduct!: ProductDTO;

  constructor(private helperService: HelperService,private ProductService: ProductService,private storageService: StorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts()
    throw new Error('Method not implemented.');
  }
  public getProducts(): void{
    this.ProductService.getProducts().subscribe(
      (response:ProductDTO[]) =>{
        this.Products = response;
      },
      (error: HttpErrorResponse)=>{alert(error.message);}
      );
  }
  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-Product-form')!.click();
    this.ProductService.addProduct(addForm.value).subscribe(
      (response: ProductDTO) => {
        console.log(response);
        this.getProducts();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public logoutPage():void{
    this.storageService.clean();
    this.router.navigate(['/login']);

}

  public onUpdateEmloyee(Product: ProductDTO): void {
    this.ProductService.updateProduct(Product).subscribe(
      (response: ProductDTO) => {
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(ProductId: any): void {
    if(ProductId !== undefined){
      ProductId = Number(ProductId);
      this.ProductService.deleteProduct(ProductId).subscribe(
        (response: void) => {
          console.log(response);
          this.getProducts();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

    }else{
      console.log("error type ID");
    }
  }

  public searchProducts(key: string): void {
    console.log(key);
    const results: ProductDTO[] = [];
    for (const Product of this.Products) {
      if (Product.name?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      // || Product.mail?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      // || Product.phone?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      // || Product.jobTitle?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(Product);
      }
    }
    this.Products = results;
    if (results.length === 0 || !key) {
      this.getProducts();
    }
  }

  public onOpenModal(Product: any, mode: string): void{
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProductModal');
    }
    if (mode === 'edit') {
      this.editProduct = Product;
      button.setAttribute('data-target', '#updateProductModal');
    }
    if (mode === 'delete') {
      this.deleteProduct = Product;
      button.setAttribute('data-target', '#deleteProductModal');
    }
    container.appendChild(button);
    button.click();
  }


}
