import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { HttpCacheService } from '../cache/http-cache.service';
import { Observable, of } from 'rxjs';
import { ignoreElements, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptor implements HttpInterceptor {

  constructor(private _httpCacheService:HttpCacheService) { }

  intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    if(req.method !== 'GET'){
      console.log(`Invalidating Cache -
       ${req.method} and URL is- ${req.method}`)
       this._httpCacheService.invalidateCache()
       return next.handle(req)
    }
    const cachedResponse:HttpResponse<any> = this._httpCacheService.get(req.url)
    if(cachedResponse){
      console.log(`Returning Cached Response : ${cachedResponse.url}`)
      console.log(cachedResponse)
      return of (cachedResponse)

      
    }
    return next.handle(req)
    .pipe(
      tap(event=>{
        if(event instanceof HttpResponse){
          console.log(`Adding item to the cache : ${req.url}`)
          this._httpCacheService.put(req.url,event)

        }
      })
    )
    
  }
}
