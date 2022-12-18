import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [{path:'', redirectTo:'products',pathMatch:'full'},{path:'products', component: ProductsComponent},{path:'cart', component: CartComponent},
{path:'order', component: OrderComponent},{path:'login', component: LoginComponent},
{path:'addProduct', component: AddProductComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
