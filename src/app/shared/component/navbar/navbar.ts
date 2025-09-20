import { LoginService } from './../../../core/service/auth/login-service';
import { Component, inject } from '@angular/core';
import { FlowbiteService } from '../../../core/service/flowbite/flowbite-service';
import { initFlowbite } from 'flowbite';
import {  OnInit } from '@angular/core';import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

import { CartService } from '../../../core/service/cart/cart-service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
isLogedIn!:boolean;
cartNumber:number=0;
constructor(private flowbiteService: FlowbiteService , private LoginService:LoginService,private cart:CartService) {

}

  ngOnInit(): void {

    this.LoginService.userData.subscribe({
      next:(res)=>{
        if(res!==null){
          this.isLogedIn=true
        }else{
          this.isLogedIn=false
        }
      },error:(err)=>{}
    })
    this.cart.cartNumber.subscribe({
      next:(res)=>{
        
        this.cartNumber=res
      }
    })
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
      this.LoginService.userData
    });
  }
  signOut(){
    this.LoginService.logOut()
  }
  
}
