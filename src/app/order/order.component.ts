import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../cart.service';
import { OrderDTO } from '../dto/oderDTO';
import { HelperService } from '../helper.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import * as JsEncryptModule from 'jsencrypt';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [DatePipe]
})
export class OrderComponent implements OnInit {
  defaults: OrderDTO;
  items : any = [];
  total!: number;
  len!: number;
  // myDate= new Date();
  checkoutForm = this.formBuilder.group({
    customerName: new FormControl('', [Validators.required]),
    email:new FormControl('' , [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    phoneNumber:new FormControl('', [Validators.required]),
    nameCard: new FormControl('', [Validators.required]),
    cardNumber:new FormControl('', [Validators.required]),
    totalAmount :new FormControl(this.cartService.getTotalPrice()),
    orderDeatil :new FormControl(this.cartService.getInforCart()),
    createAt :new FormControl(Date.now())

  });

  constructor(
   private cartService : CartService,
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private datePipe: DatePipe,
  ) {}
  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.items = res;
    })
    this.total=this.cartService.getTotalPrice();
    this.len = this.items.length;
    this.defaults = new OrderDTO();
    
  }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.checkoutForm.value);
    // this.defaults.address, this.defaults.customerName, this.defaults.phoneNumber,this.defaults.nameCard,this.defaults.cardNumber= this.checkoutForm.get(['address','name','phone','nameCard','cardNumber']).value;
    // this.defaults.address=this.checkoutForm.get('address').value;
    // console.log(this.defaults.address)
    // this.saveOrder(this.defaults);
    const order: OrderDTO = new OrderDTO(this.checkoutForm.value);
    console.log(order);
    this.saveOrder(order);
    this.checkoutForm.reset();
    this.cartService.removeAllCart();
  }
  // public trimDataType(fieldName: any, val: string): void {
  //   this.checkoutForm.get(fieldName).setValue(val.trim());
  // }
  public saveOrder(saveOrder:any): void{
    let publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCz1zqQHtHvKczHh58ePiRNgOyiHEx6lZDPlvwBTaHmkNlQyyJ06SIlMU1pmGKxILjT7n06nxG7LlFVUN5MkW/jwF39/+drkHM5B0kh+hPQygFjRq81yxvLwolt+Vq7h+CTU0Z1wkFABcTeQQldZkJlTpyx0c3+jq0o47wIFjq5fwIDAQAB";
    let RSAEncrypt = new JsEncryptModule.JSEncrypt();
    RSAEncrypt.setPublicKey(publicKey);
    saveOrder.email = RSAEncrypt.encrypt(saveOrder.email);
    saveOrder.phoneNumber = RSAEncrypt.encrypt(saveOrder.phoneNumber);
    saveOrder.address = RSAEncrypt.encrypt(saveOrder.address);
    saveOrder.cardNumber = RSAEncrypt.encrypt(saveOrder.cardNumber);
    console.log(saveOrder)
    this.helperService.saveOrder(saveOrder).subscribe((res: any)=>{
      console.log("ok");
    },(error: HttpErrorResponse)=>{
      alert(error.message);
    }
    );
  }
  get customerName(){
    return this.checkoutForm.get('customerName'); 

  }
  get phoneNumber(){
    return this.checkoutForm.get('phoneNumber'); 

  }
  get email(){
    return this.checkoutForm.get('email'); 

  }
  get address(){
    return this.checkoutForm.get('address'); 

  } 
  get cardNumber(){
    return this.checkoutForm.get('cardNumber'); 

  }
  get nameCard(){
    return this.checkoutForm.get('nameCard'); 

  }
}
