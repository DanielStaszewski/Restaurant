import { Component, Output, EventEmitter } from "@angular/core";
import { Meal } from "src/models/meal.model";

@Component({
    selector: 'app-meal-detail',
    templateUrl: './meal-detail.component.html',
    styleUrls: ['./meal-detail.component.scss']
})
export class MealDetailComponent{

    meal: Meal;
    @Output() close = new EventEmitter<void>();

    onClose(){
        this.close.emit();
    }
}