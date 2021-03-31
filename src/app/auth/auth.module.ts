import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { AuthGuard } from "./auth.guard";
import { AuthProvider } from "./auth.interceptor";
import { HelperProvider } from "./helper-interceptor";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([{ path: 'auth', component: AuthComponent, canActivate: [AuthGuard] }
        ])
    ],
    providers: [HelperProvider, AuthProvider]
})
export class AuthModule {

}