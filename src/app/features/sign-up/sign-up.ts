import { Login } from './../login/login';
import { Router } from '@angular/router';
import { signUpService } from './../../core/service/auth/signup';

import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { error, group } from 'console';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})
export class SignUp {
  confirmPassword(group:AbstractControl){
    let password=group.get('password')?.valid;
    let rePassword=group.get('rePassword')?.valid;
    if(password === rePassword){
      return null;
    }else {
      return {mismatch:true}
    };
  }
  private signUpService=inject(signUpService)
  private router=inject(Router)
  errMsg:string='';
  isLoading:boolean=false;

registarForm = new FormGroup({
  name : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  email : new FormControl(null,[Validators.required,Validators.email]),
  password : new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  rePassword : new FormControl(null,[Validators.required]),
  phone : new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
},{validators:this.confirmPassword})

submitForm(){
  
  console.log(this.registarForm);
  this.isLoading=true
  this.signUpService.registsarData(this.registarForm.value).subscribe({
    next:(res)=>{
      
      if(res.message=='success'){
        this.router.navigate(['/login'])
        this.isLoading=false
      }
    },error:(err)=>{
      
      this.errMsg=err.error.message
      this.isLoading=false
    }
  })
  
  if(this.registarForm.valid){
  }else(
    this.registarForm.markAllAsTouched()
  )
  
}
}
