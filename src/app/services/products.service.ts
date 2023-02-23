import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, tap, throwError} from "rxjs";
import {IProducts} from "../models/products";
import {ErrorService} from "./error.service";
import {products} from "../data/products";

@Injectable({
  providedIn: "root"
})

export class ProductsService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
    ) {
  }

  products: IProducts[] = []

  getAll(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>('https://fakestoreapi.com/products', {
      params: new HttpParams({
        fromObject: {limit: 10}
      })
    })
      .pipe(
        tap(products => this.products = products),
        catchError(this.errorHandler.bind(this))
    )
  }

  create(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>('https://fakestoreapi.com/products', product)
      .pipe(
        tap(prod => this.products.push(prod))
      )
  }
  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }

}
