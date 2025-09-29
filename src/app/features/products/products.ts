import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../core/service/productService/product-service';
import { Card } from "../card/card";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipe/search/search-pipe';
import { WishListService } from '../../core/service/wishlist/wish-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [Card,FormsModule,SearchPipe,CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit{
  private wishList=inject(WishListService)
  wishlistItems: any[] = [];
  inputText:string='';
private _productService=inject(ProductService);
dataList:WritableSignal<any>=signal([])
getData(){
  
  this._productService.getALLProducts().subscribe({
    next:(res:any)=>{
      console.log(res);
      this.dataList.set(res.data)
    },error:(err)=>{
      console.log(err);
    }
  })
}

ngOnInit():void{
  this.getData()
  this.loadWishlist();
}




loadWishlist() {
  this.wishList.getLogedUserWishlist().subscribe({
    next: (res) => {
      this.wishlistItems = res.data;
    },
    error: (err) => console.log(err)
  });
}

isInWishlist(productId: string): boolean {
  return this.wishlistItems.some((item: any) => item._id === productId);
}
}
