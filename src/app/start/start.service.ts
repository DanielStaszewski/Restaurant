import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, map } from "rxjs/operators";
import { CustomerOpinion } from "src/models/customer-opinion.model";
import { MealCategory } from "src/models/enums/meal-category.enum";
import { Meal } from "src/models/meal.model";
import { Post } from "src/models/post.model";

const API_POSTS_URL = "http://localhost:3000/posts";
const API_OPINIONS_URL = "http://localhost:3000/opinions";
const API_MEALS_URL = "http://localhost:3000/meals";

@Injectable({providedIn: 'root'})
export class StartService {

    constructor(private http: HttpClient){

    }

    public getRecentPosts(){
        return this.http.get<Post[]>(API_POSTS_URL)
            .pipe(
                delay(1000),
                map((posts: Post[]) => this.searchRecentPosts(posts))
            )
    }

    public getCustomerOpinions(){
        return this.http.get<CustomerOpinion[]>(API_OPINIONS_URL)
        .pipe(
            delay(1000)
        )
    }

    public getMeals(){
        return this.http.get<Meal[]>(API_MEALS_URL)
            .pipe(
                delay(1000),
                map((meals: Meal[]) => this.diversifyMeals(meals)),
            )
    }

    private searchRecentPosts(posts: Post[]): Post[]{
        const sortedPostsByDate = posts.sort((a: Post, b: Post) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        if(sortedPostsByDate.length > 4){
            return sortedPostsByDate.slice(0, 5);
        } else {
            return sortedPostsByDate;
        }
    }

    private diversifyMeals(meals: Meal[]): Meal[]{
        const categories = [MealCategory.BREAKFAST, MealCategory.DINNER, MealCategory.SUPPER];
        const diversifiedMeals: Meal[] = [];
        categories.map((category: MealCategory) => {
            const mealsByCategory = meals.filter((meal: Meal) => meal.category === category).slice(0,2);
            diversifiedMeals.push(...mealsByCategory);
        })
        return diversifiedMeals;
    }

}

