import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlaceholderDirective } from 'src/app/shared/directives/placeholder.directive';
import { MealCategory } from '../../../models/enums/meal-category.enum';
import { Meal } from '../../../models/meal.model';
import { MenuService } from '../menu.service';
import { MealDetailComponent } from '../meal-detail/meal-detail.component';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit, OnDestroy {

  @ViewChild(PlaceholderDirective, {static: false}) mealDetailHost: PlaceholderDirective;
  meals: Meal[];
  categories: MealCategory[];
  activeCategory: MealCategory = MealCategory.BREAKFAST;
  isLoading = false;
  private closeSub: Subscription;

  constructor(private menuService: MenuService, private cmpFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.fetchMeals();
    this.categories = this.menuService.getCategories();
  }

  fetchMeals(){
    this.isLoading = true;
    this.menuService.getMeals()
      .subscribe((meals: Meal[]) => {
        this.meals = meals;
        this.isLoading = false;
      })
  }

  onCategoryClick(index: number): void{
    this.activeCategory = this.categories[index];
  }

  onMealDetail(id: number){
    this.isLoading = true;
    this.menuService.getMeal(id)
      .subscribe((meal: Meal) => {
        this.isLoading = false;
        this.showMealDetails(meal);
      }
      , (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err)
      });   
  }

  private showMealDetails(meal: Meal): void{
    const mealDetailCmpFactory = this.cmpFactoryResolver.resolveComponentFactory(MealDetailComponent);
    const hostViewContainerRef = this.mealDetailHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(mealDetailCmpFactory);
    componentRef.instance.meal = meal;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

  ngOnDestroy(): void{
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }


}
