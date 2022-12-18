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
  public productList :  ProductDTO[] = [];
  public filterCategory :  ProductDTO[] = [];
  searchKey:string ="";
  constructor(private helperService: HelperService, private cartService : CartService){}
  ngOnInit(): void {
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
    this.getAllProduct()
    console.log()
  }
  title = 'do-an-fontend';
  public getAllProduct(): void{
    this.helperService.getAllProduct("","").subscribe((res: ProductDTO[])=>{
      this.productList = res;
      this.filterCategory = res;
    },(error: HttpErrorResponse)=>{
      alert(error.message);
    }
    );
  }
  public addtocart(item: any){
    this.cartService.addtoCart(item);
  }
  public filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }

}
