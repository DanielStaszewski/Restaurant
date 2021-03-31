import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogService } from 'src/app/blog/blog.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  totalAmountPosts: number;
  currentPage = 1;
  postsLimit = 1;
  searchForm: FormGroup;
  searchText: string = '';
  messageIfNoPosts = '';
  isLoading = false;
  amountOfPosts: Subscription;
  

  constructor(private blogService: BlogService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.amountOfPosts = this.blogService.amountOfPosts.subscribe((amount: number) => this.totalAmountPosts = amount);
    this.createSearchForm();
    this.loadPosts();
    this.onChanges();
  }


  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      'search': ['']
    })
  }

  onChanges(): void {
    this.searchForm.get('search').valueChanges.subscribe(val => {
      this.searchText = val;
    });
  }

  onChangedPage(numberPage: number): void {
    if(this.postsLimit * numberPage > this.totalAmountPosts) return;
    this.currentPage = numberPage;
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading = true;
    const searchParam = this.retrieveParam('q');
    const tagParam = this.retrieveParam('tag');
    const categoryParam = this.retrieveParam('category');
    let mode: string;
    let postObs: Observable<Post[]>;
    if (searchParam) {
      postObs = this.blogService.getSearchedPosts(this.postsLimit, this.currentPage, searchParam);
      mode = searchParam;
    } else if (tagParam) {
      postObs = this.blogService.getPostsByTag(this.postsLimit, this.currentPage, tagParam);
      mode = tagParam;
    } else if (categoryParam) {
      postObs = this.blogService.getPostsByCategory(this.postsLimit, this.currentPage, categoryParam);
      mode = categoryParam;
    } else {
      postObs = this.blogService.getPosts(this.postsLimit, this.currentPage);
    }
    postObs.subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = [...posts];
      if (this.posts.length === 0) {
        switch (mode) {
          case (searchParam):
            this.messageIfNoPosts = `No posts search results for '${searchParam}'`;
            break;
          case (tagParam):
            this.messageIfNoPosts = `No posts for tag '${tagParam}'`;
            break;
          case (categoryParam):
            this.messageIfNoPosts = `No posts for category '${categoryParam}'`;
            break;
          default: 
            this.messageIfNoPosts = `No available posts`;
        }
      }
    }, error => {
      this.isLoading = false;
      console.log(error)
    });
  }

  retrieveParam(paramName: string): string {
    const param = this.route.snapshot.queryParams[paramName];
    return param;
  }

  onReadMore(postId: number): void {
    this.router.navigate(['blog', postId]);
  }

  ngOnDestroy(){
    this.amountOfPosts.unsubscribe();
  }

}
