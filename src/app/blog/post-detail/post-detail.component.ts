import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/blog/blog.service';
import { Post } from 'src/models/post.model';
import { Comment } from 'src/models/comment.model';
import { PlaceholderDirective } from 'src/app/shared/directives/placeholder.directive';
import { AlertService } from 'src/app/shared/alert.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/models/user.model';
import { Subscription } from 'rxjs';


interface CategoryAmounts {
  categoryName: string;
  amount: number;
}

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  post: Post;
  postComments: Comment[] = [];
  id: number;
  searchForm: FormGroup;
  commentForm: FormGroup;
  isLoading = false;
  user: User = null;
  postCategoriesAmounts: Array<CategoryAmounts> = [];
  userSub: Subscription;
  categoriesAmountsSub: Subscription;


  constructor(private route: ActivatedRoute, private blogService: BlogService, private formBuilder: FormBuilder,
    private alertService: AlertService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.createSearchForm();
    this.createCommentForm();
    this.id = this.route.snapshot.params['id'];
    this.fetchPost();
    this.fetchComments();
    this.userSub = this.authService.user
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  createSearchForm(): void {
    this.searchForm = this.formBuilder.group({
      'search': ['', Validators.required],
    })
  }

  createCommentForm(): void {
    this.commentForm = this.formBuilder.group({
      'message': ['', Validators.required],
    })
  }

  fetchPost(): void {
    this.isLoading = true;
    this.blogService.getPost(this.id)
      .subscribe(
        (data: Post) => {
          this.isLoading = false;
          this.post = data
          this.showCategoriesAmounts(this.post);
        }
      );
  }

  fetchComments(): void {
    this.blogService.getComments(this.id)
      .subscribe(
        (data: Comment[]) => {
          this.isLoading = false;
          this.postComments = this.sortCommentsByDate(data);
        }
      );
  }

  onPostComment(): void {
    this.isLoading = true;
    if (!this.commentForm.valid) {
      this.isLoading = false;
      return;
    }
    const content = this.commentForm.get('message').value;
    this.blogService.postComment(this.user.username, +this.post.id, content)
      .subscribe(
        _ => {
          this.fetchComments();
          this.isLoading = false;
          this.alertService.showAlert(this.alertHost, 'Your comment has been added successfully!');
          this.commentForm.reset();
        }
      )
  }

  onSearchPosts() {
    const searchText = this.searchForm.get('search').value;
    if (searchText) {
      this.searchForm.reset();
      this.router.navigate(['/blog'], { queryParams: { q: searchText } });
    }
  }

  sortCommentsByDate(postComments: Comment[]) {
    return postComments.slice().sort((a: Comment, b: Comment) => +new Date(b.createdDate) - +new Date(a.createdDate));
  }

  showCategoriesAmounts(post: Post): void {
    this.categoriesAmountsSub = this.blogService.categoriesAmounts
      .subscribe((categoriesAmounts) => {
        for (let category in categoriesAmounts) {
          if (post.categories.includes(category)) {
            this.postCategoriesAmounts.push({categoryName: category, amount: categoriesAmounts[category]});
          }
        }
      })
  }

  showPostsListByTag(tag: string) {
    this.router.navigate(['/blog'], { queryParams: { tag: tag } });
  }

  showPostsListByCategory(category: string) {
    this.router.navigate(['/blog'], { queryParams: { category: category } });
  }

  ngOnDestroy(): void {
    if (this.alertService.closeSub) {
      this.alertService.closeSub.unsubscribe();
    }
    this.userSub.unsubscribe();
    if(this.categoriesAmountsSub) this.categoriesAmountsSub.unsubscribe();
  }





}