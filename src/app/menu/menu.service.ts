import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { MealCategory } from '../../models/enums/meal-category.enum';
import { Meal } from '../../models/meal.model';


const API_MEALS_URL = "http://localhost:3000/meals";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) {

  }

  private categories: MealCategory[] = [MealCategory.BREAKFAST, MealCategory.DINNER, MealCategory.SUPPER];

  getMeals() {
    return this.http.get<Meal[]>(API_MEALS_URL)
      .pipe(
        delay(1000),
        catchError(this.handleError)
      )
  }

  getMeal(id: number){
    return this.http.get<Meal>(API_MEALS_URL + `/${id}`)
    .pipe(
      delay(100),
      catchError(this.handleError)
    );
  }

  getCategories() {
    return this.categories.slice();
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


}
