import { BrandsService } from './../../core/service/brands/brands-service';
import { Component, inject } from '@angular/core';
import { Brands } from '../brands/brands';

@Component({
  selector: 'app-pop-up',
  imports: [],
  templateUrl: './pop-up.html',
  styleUrl: './pop-up.scss'
})
export class PopUp {
private brand=inject(BrandsService)
data:string='';

detailsBrand(){
  this.brand.getBrandDetails(this.data).subscribe({
    next:(res)=>{
      console.log(res.data._id);
      res.data._id=res.data
    }
  })
}
}
