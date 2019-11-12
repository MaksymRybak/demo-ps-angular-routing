import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductResolved } from './product';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {
  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = route.paramMap.get('id');

    if (isNaN(+id)) {
      const msg = `Product id was not a number: ${id}`;
      console.error(msg);
      return of({product: null, error: msg});
    }

    return this.productService.getProduct(+id)
      .pipe(map(product => ({product: product})),
      catchError(error => {
        const msg = `Retrieval error: ${error}`;
        console.error(msg);
        return of({product: null, error: msg});
      }));
  }
}
