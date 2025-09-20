import { error } from 'console';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { resetPasswordService } from '../../core/service/auth/reset-password-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss'
})
export class ForgetPassword {
private _resetpasswordService=inject(resetPasswordService)
private router=inject(Router)
step:number=1;
isLoading:boolean=false
errMsg:string='';
forgetPasswordForm:FormGroup=new FormGroup({
email:new FormControl('',[Validators.required,Validators.email])
})
submitForgetForm(){
this.isLoading=true;
this._resetpasswordService.forgetPassword(this.forgetPasswordForm.value).subscribe({
  next:(res)=>{
    this.isLoading=false
      if(res.statusMsg=='success'){
      this.step=2
    }
  },error:(err)=>{
    this.errMsg=err.error.message
    this.isLoading=false
  }
})
}
resetCodeForm:FormGroup=new FormGroup({
resetCode:new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{6,}$/)])
})
submitCodeForm(){

this.isLoading=true;
this._resetpasswordService.resetCode(this.resetCodeForm.value).subscribe({
  next:(res)=>{
    this.isLoading=false
    if(res.status=='Success'){
      this.step=3
    }
  },error:(err)=>{
    this.errMsg=err.error.message
    this.isLoading=false
  }
})
}
resetPasswordForm:FormGroup=new FormGroup({
email:new FormControl('',[Validators.required,Validators.email]),
newPassword:new FormControl('',[Validators.required])
})
submitNewPasswordForm(){
this.isLoading=true;
this._resetpasswordService.resetPassword(this.resetPasswordForm.value).subscribe({
  next:(res)=>{
    this.isLoading=false
      if(res.token){
      this.router.navigate(['/login'])
    }
  },error:(err)=>{
    this.errMsg=err.error.message
    this.isLoading=false
  }
})
}

}
