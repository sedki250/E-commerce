import { WishListService } from './../../core/service/wishlist/wish-list';
import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/service/cart/cart-service';


@Component({
  selector: 'app-wish-list',
  imports: [CommonModule,RouterLink,CurrencyPipe],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.scss'
})
export class WishList implements OnInit{
private cartService=inject(CartService)
productId:string=''
  wishlistItems: any[] = [];
  constructor(private wishlistService: WishListService,private toaster:ToastrService) {}

  ngOnInit() {
    this.loadWishlist();
  }

  
  loadWishlist() {
    this.wishlistService.getLogedUserWishlist().subscribe({
      next: (res: any) => {
        this.wishlistItems = res.data;
      },
      error: (err: any) => console.log(err)
    });
  }

  addToCart(productId: string): void {
  this.cartService.addProductToCart(productId).subscribe({
    next: (res: any) => {
      this.productId=res.data._id
      this.toaster.success('The product has been added to the cart');
      console.log('cart response', res);
    },
    error: (err: any) => {
      console.log(err);
      this.toaster.error('Failed to add the product to the cart');
    }
  });
}

removeItem(productId: string) {
  this.wishlistService.removeFromWishlist(productId).subscribe({
    next: (res) => {
      console.log('Product removed', res);

      
      this.wishlistItems = this.wishlistItems.filter(item => item._id !== productId);
    },
    error: (err) => {
      console.error(err);
    }
  });
}
addProduct(id:string){
this.cartService.addProductToCart(id).subscribe({
  next:(res)=>{
    
    this.toaster.success(res.message,"success")
    this.cartService.cartNumber.next(res.numOfCartItems)
  },error:(err)=>{
    
    this.toaster.error(err.error.message,"error")
  } 
})
}

}
