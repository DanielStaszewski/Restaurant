import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";
import { PostListComponent } from "./post-list/post-list.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        PostDetailComponent,
        PostListComponent
    ],
    imports: [
        SharedModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: 'blog', component: PostListComponent},
            {path: 'blog/:id', component: PostDetailComponent}
        ])
    ]
})
export class BlogModule { }
