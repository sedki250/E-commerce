import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/service/brands/brands-service';
import { IBrands } from '../../core/interface/brands/ibrands';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [FormsModule,CommonModule],
  templateUrl: './brands.html',
  styleUrl: './brands.scss'
})
export class Brands implements OnInit{
detailsBrand() {
throw new Error('Method not implemented.');
}
  private brands=inject(BrandsService)
  brandlist:IBrands[]=[]
  inputText: any;

  getBrands(){
    this.brands.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.brandlist=res.data
      }
    })
  }
ngOnInit(): void {
    this.getBrands()
}
selectedBrand: any = null;
  brandsBob = [
    
  ];

  popupImages: string[] = [];

  openPopup(brand: any) {
    this.selectedBrand = brand;

    // عمل for loop عشان تدخل الصور
    this.popupImages = [];
    for (let i = 0; i < brand.images.length; i++) {
      this.popupImages.push(brand.images[i]);
    }
  }

  closePopup() {
    this.selectedBrand = null;
    this.popupImages = [];
  }
}
