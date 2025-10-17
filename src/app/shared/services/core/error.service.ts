import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
// import 'rxjs/add/observable/throw';
import { HttpErrorResponse } from '@angular/common/http';
// import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
/**
 * Default error handler
 */
@Injectable()
export class ErrorHandler {

  constructor(
    private router: Router
  ) { }

  public handleError(error: HttpErrorResponse): any {

    switch (error.status) {
      case 401:
        this.router.navigate(['']);
        break;

      case 400:
        return throwError(error.error || 'Server error');
    }
  }
}

/** Error when invalid control is dirty or touched */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     return !!(control && control.invalid && (control.dirty || control.touched || control.errors.required));
//   }
// }
export class MyErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched || control.errors.required));
  }
}
