import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { MealDetailComponent } from "./meal-detail/meal-detail.component";
import { MenuListComponent } from "./menu-list/menu-list.component";
import { MenuComponent } from "./menu.component";


@NgModule({
    declarations: [
        MenuListComponent,
        MealDetailComponent,
        MenuComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'menu', component: MenuComponent }
        ])
    ],
    entryComponents: [MealDetailComponent]
})
export class MenuModule {

}