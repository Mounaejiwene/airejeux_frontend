import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(); // Placeholder for future global error handling (snackbars)
};
