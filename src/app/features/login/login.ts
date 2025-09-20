import { CookieService } from 'ngx-cookie-service';
import { signUpService } from './../../core/service/auth/signup';
import { LoginService } from './../../core/service/auth/login-service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private _loginservice=inject(LoginService)
  private router=inject(Router)
  cookieService=inject(CookieService)
  errMsg:string='';
  isLoading:boolean=false;



loginForm = new FormGroup({
  email : new FormControl(null,[Validators.required,Validators.email]),
  password : new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
})

submitForm(){
  
  this.isLoading=true
  
  this._loginservice.loginData(this.loginForm.value).subscribe({
    next:(res)=>{
      
      if(res.message=='success'){
        this.router.navigate(['/home'])
        this.isLoading=false
        // localStorage.setItem('token',res.token)
        this.cookieService.set('token', res.token)
        this.cookieService.set('userId', res.user._id);
        this._loginservice.setToken()
        
      }
    },error:(err)=>{
      
      this.errMsg=err.error.message
      this.isLoading=false
    }
  })
  
  if(this.loginForm.valid){
  }else(
    this.loginForm.markAllAsTouched()
  )
  
}
}



