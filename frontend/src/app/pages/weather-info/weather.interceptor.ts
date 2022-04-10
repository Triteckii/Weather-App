import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export class WeatherInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloneReq = req.clone({
            params: req.params.appendAll({
                'appid': environment.openWeather.key
            })
        });
        return next.handle(cloneReq);
    }

}