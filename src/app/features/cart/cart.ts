import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/service/cart/cart-service';
import { IProductCart } from '../../core/interface/iproduct-cart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit{
private cart=inject(CartService)
private toaster=inject(ToastrService)
cartId!:string;
productList:IProductCart[]=[];
totalPrice:number=0;

getCart(){
  this.cart.getProductToCart().subscribe({
    next:(res)=>{
      this.cartId=res.data._id
      this.productList=res.data.products
      this.totalPrice=res.data.totalCartPrice
      this.cart.cartNumber.next(res.numOfCartItems)
    }
  })
}
removeProduct(id:string){
this.cart.deleteProductFromCart(id).subscribe({
  next:(res)=>{
    this.toaster.success('product deleted...')
    this.getCart();
  },error:(err)=>{
    this.toaster.error()
  }
})
}
updateproduct(count:number,Id:string){
  this.cart.updateProductToCart(count,Id).subscribe({
    next:()=>{
      this.getCart()
    }
  })
}
clearCart(){
  this.cart.clearCart().subscribe({
    next:()=>{
      this.getCart()
    }
  })
}
ngOnInit(): void {
    this.getCart()
}

}
