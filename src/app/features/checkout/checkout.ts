import { CheckOutService } from './../../core/service/checkout/check-out-service';
import { Component, inject } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {
 private _checkOutService=inject(CheckOutService)
  private route=inject(ActivatedRoute)
  cookieService=inject(CookieService)
  errMsg:string='';
  isLoading:boolean=false;
  cartId!:string|null


checkOutForm = new FormGroup({
  details : new FormControl('',[Validators.required]),
  phone : new FormControl('',[Validators.required]),
  city : new FormControl('',[Validators.required]),
})

getId(){
  this.route.paramMap.subscribe({
    next:(res)=>{
      this.cartId=res.get('id')
    }
  })
}

ngOnInit():void{
this.getId()
}

submitForm(){
  
  this.isLoading=true
  console.log(this.checkOutForm);
  if(this.checkOutForm.valid){
  this._checkOutService.checkOutSession(this.checkOutForm.value,this.cartId).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.status=='success'){
        window.location.href=res.session.url 
        this.isLoading=false
      }
    },error:(err)=>{
      
      this.errMsg=err.error.message
      this.isLoading=false
    }
  })
  }

  
  if(this.checkOutForm.valid){
  }else(
    this.checkOutForm.markAllAsTouched()
  )
  
}

}
