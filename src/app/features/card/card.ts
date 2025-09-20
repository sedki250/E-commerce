import { CartService } from './../../core/service/cart/cart-service';
import { CurrencyPipe } from '@angular/common';
import { Component, Input, forwardRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProductCart, Product } from '../../core/interface/iproduct-cart';
import { WishListService } from '../../core/service/wishlist/wish-list';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe, forwardRef(() => TwoWordsPipe)],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  private cart=inject(CartService)
  private toaster=inject(ToastrService)
  private wishList=inject(WishListService)
@Input() productData:any;
category: any;
heartActive: boolean = false;
  wishlistItems: IProductCart[]=[];

loadWishlist() {
  this.wishList.getLogedUserWishlist().subscribe({
    next: (res) => {
      this.wishlistItems = res.data;
      
      this.heartActive = this.isInWishlist(this.productData._id);
    },
    error: (err) => console.log(err)
  });
}

isInWishlist(productId: string): boolean {
  return this.wishlistItems.some((item: any) => item._id === productId);
}

toggleHeart(event: Event) {
  event.stopPropagation();

  if (!this.heartActive) {
    
    this.wishList.addToWishlist(this.productData._id).subscribe({
      next: (res) => {
        console.log('added to wishlist', res);
        this.heartActive = true;
        this.wishlistItems.push(this.productData);
      },
      error: (err) => console.log('failed to add', err)
    });
  } else {
    
    this.wishList.removeFromWishlist(this.productData._id).subscribe({
      next: (res) => {
        console.log('removed from wishlist', res);
        this.heartActive = false;
        this.wishlistItems = this.wishlistItems.filter(
          (item: any) => item._id !== this.productData._id
        );
      },
      error: (err) => console.log(err)
    });
  }
}

addProduct(id:string){
this.cart.addProductToCart(id).subscribe({
  next:(res)=>{
    
    this.toaster.success(res.message,"success")
    this.cart.cartNumber.next(res.numOfCartItems)
  },error:(err)=>{
    
    this.toaster.error(err.error.message,"error")
  } 
})
}

}

@Pipe({
  name: 'twoWords'
})
export class TwoWordsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.split(' ').slice(0, 2).join(' ');
  }

}
