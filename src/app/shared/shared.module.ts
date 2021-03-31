import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { FilterPipe } from "./pipes/filter.pipe";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./directives/placeholder.directive";
import { ShortenPipe } from "./pipes/shorten.pipe";



@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        FilterPipe,
        ShortenPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        FilterPipe,
        ShortenPipe,
        CommonModule
    ],
    entryComponents: [AlertComponent]
})
export class SharedModule { }