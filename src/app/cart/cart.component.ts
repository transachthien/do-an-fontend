import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { OrderComponent } from '../order/order.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService
    ,private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
    console.log(this.cartService.getInforCart());
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  public   openDialog(row: any): void {
    this.dialog
      .open(OrderComponent, {
        data: row,
        autoFocus: false
      })
      .afterClosed()
      .subscribe((mess) => {
        if (mess) {
     //     
        }
      });
  }

}
