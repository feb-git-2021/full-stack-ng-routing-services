import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map,catchError, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
//@Injectable()
export class ProductService {

  productsUrl:string='./assets/api/data/products.json'
  products:IProduct[] 

 
  

  constructor(private _httpClient:HttpClient) { 
    
  }
  // getProducts():IProduct[]{
  //   return this.products
  // }

  getProducts():Observable<IProduct[]>{
 
    return this._httpClient.get<IProduct[]>(this.productsUrl)
    .pipe(
      tap((data)=>console.log(`Full Product List : ${JSON.stringify(data)}`)),
      catchError(this.handleError)
    )
  }
  // getProducts(){
 
  //  console.log( this._httpClient.get<IProduct[]>(this.productsUrl).toPromise())
  // }


  //retreiving Single Product
  getProduct(id:number):Observable<IProduct>{
    //return this._httpClient.get<IProduct>(this.productsUrl/${id})
    return this.getProducts()
    .pipe(
      map((products:IProduct[])=>products.find((p)=>p.productId===id)),     
          catchError(this.handleError)        

    )
  }
  editProduct(){
    this._httpClient.post
  }

 private handleError(err):Observable<any>{
   let errorMsg:string =''
   if(err.error instanceof Error){
      errorMsg=`An error occured :${err.error.message}`
   }else{
     errorMsg=`Server returned code : ${err.status} 
     error message is ${err.message}`
   }
   console.log(errorMsg)
   return throwError(errorMsg)
 }

// getProduct(id:number):Observable<IProduct>{
//   return this.getProducts()
//   .map((products:IProduct[])=>products.find((p)=>p.productId===id))
//   .tap()
//   .catchError()

// }
 }


//  let arr =[4,5,6,7,8,10]
//  let res= arr.map(e=>e%2===0)
//  console.log(res)

