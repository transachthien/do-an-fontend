import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductDTO } from '../dto/productDTO';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: ProductDTO[] = [];
  constructor(private helperService: HelperService, private cartService : CartService){}
  ngOnInit(): void {
    this.getAllProduct();
  }
  title = 'do-an-fontend';
  public getAllProduct(): void{
    this.helperService.getAllProduct().subscribe((res: ProductDTO[])=>{
      this.products = res;
    },(error: HttpErrorResponse)=>{
      alert(error.message);
    }
    );
  }
  public addtocart(item: any){
    this.cartService.addtoCart(item);
  }

}
