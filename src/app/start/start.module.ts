import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../shared/shared.module";
import { StartComponent } from "./start.component";

@NgModule({
    declarations: [
        StartComponent
    ],
    imports: [
        SharedModule,
        NgbModule,
        RouterModule.forChild([
            {path: '', pathMatch: 'full', component: StartComponent}
        ])
    ]
})
export class StartModule{

}