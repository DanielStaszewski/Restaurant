import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { FooterComponent } from "./footer/footer.component";
import { JumbotronComponent } from "./jumbotron/jumbotron.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { SidedrawerComponent } from './navigation/sidedrawer/sidedrawer.component';


@NgModule({
    declarations: [
        JumbotronComponent,
        NavigationComponent,
        FooterComponent,
        NavbarComponent,
        SidedrawerComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports:[
        JumbotronComponent,
        NavigationComponent,
        FooterComponent
    ]
})
export class LayoutModule{

}