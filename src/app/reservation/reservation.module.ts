import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../shared/shared.module";
import { ReservationComponent } from "./reservation.component";

@NgModule({
    declarations: [
        ReservationComponent
    ],
    imports: [
        SharedModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: 'reservation', component: ReservationComponent}
        ])
    ]
})
export class ReservationModule{

}