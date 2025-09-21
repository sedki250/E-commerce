import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errMsgInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster=inject(ToastrService)
  return next(req).pipe(
    catchError((err)=>{
      toaster.error(err.error.message)
      return throwError(()=>{
        return err;
      })
    })
  );
};
