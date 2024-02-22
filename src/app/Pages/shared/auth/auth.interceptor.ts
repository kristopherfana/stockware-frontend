import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const token = localStorage.getItem('Token') ?? '';
    request = request.clone(
        {
            setHeaders: {
                Authorization: token ? `Bearer ${token}` : '',
            }
        }
    )
    console.log(request);

    return next(request);
}