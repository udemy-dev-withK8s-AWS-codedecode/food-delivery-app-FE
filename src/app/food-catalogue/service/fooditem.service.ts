import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { K8ExternalIp } from 'src/app/constants/url'; 

@Injectable({
    providedIn: 'root'
})
export class FoodItemService {

    private apiUrl = K8ExternalIp+'/foodCatalogue/fetchRestaurantAndFoodItemsById/';

    constructor(private http: HttpClient) { }

    getFoodItemsByRestaurant(id:number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl+id}`)
          .pipe(
            catchError(this.handleError)
          );
      }
    
      private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(error.message || error);
      }

}