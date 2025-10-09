import { ProductService } from '../../core/service/productService/product-service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/service/cart/cart-service';

import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-product-detailes',
  imports: [CarouselModule,CurrencyPipe],
  templateUrl: './product-detailes.html',
  styleUrl: './product-detailes.scss'
})
export class ProductDetailes {
  
  [x: string]: any;
  private activated =inject(ActivatedRoute);
  private productService=inject(ProductService)
  private cart=inject(CartService)
  private toaster=inject(ToastrService)
  dataDetails:any;
  Id!:string|null;
  getProductId(){
    this.activated.paramMap.subscribe({
      next:(paramUrl)=>{
        this.Id=paramUrl.get('id');
        
      }
    })

  }

  getData(){
    this.productService.getProductDetails(this.Id).subscribe({
      next:(res:any)=>{
        this.dataDetails=res.data
        console.log(this.dataDetails);
      }
    })
  }
  
  ngOnInit(): void {
    this.getProductId();
    this.getData()
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
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
