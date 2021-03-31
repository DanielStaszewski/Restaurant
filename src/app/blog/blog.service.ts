import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { catchError, delay, filter, map, tap } from 'rxjs/operators';
import { Post } from 'src/models/post.model';
import { User } from 'src/models/user.model';
import { Comment } from '../../models/comment.model';



const API_POSTS_URL = "http://localhost:3000/posts";
const API_COMMENTS_URL = "http://localhost:3000/comments";
const API_USERS_URL = "http://localhost:3000/users";


@Injectable({
  providedIn: 'root'
})
export class BlogService {


  categoriesAmounts = new BehaviorSubject(null);
  amountOfPosts = new Subject<number>();


  constructor(private http: HttpClient) {

  }


  getPosts(postsLimit: number, currentPage: number) {
    return this.http.get<Post[]>(API_POSTS_URL)
      .pipe(
        delay(1000),
        tap((posts: Post[]) => {
          this.amountOfPosts.next(posts.length);
          this.fetchPostsByCategories(posts);
        }),
        map((posts: Post[]) => this.paginate(postsLimit, currentPage, posts)),
        catchError(this.handleError)
      );
  }

  getPost(id: number) {
    return this.http.get<Post>(API_POSTS_URL + `/${id}`)
      .pipe(
        tap(() => {
          this.fetchPostsByCategories();
        }),
        delay(1000)
      )
  }

  getUser(id: number) {
    return this.http.get<User>(API_USERS_URL + `/${id}`)
      .pipe(catchError(this.handleError));
  }


  getComments(postId: number) {
    const queryParams = `?postId=${postId}`
    return this.http.get<Comment[]>(API_COMMENTS_URL + queryParams)
      .pipe(
        delay(1000),
        catchError(this.handleError)
      );
  }

  postComment(username: string, postId: number, message: string) {
    const newId = this.generateID();
    const createdDate = new Date();
    return this.http.post<any>(API_COMMENTS_URL, { id: newId, username, postId, content: message, createdDate: createdDate })
      .pipe(
        delay(500),
        catchError(this.handleError)
      );
  }

  getSearchedPosts(postsLimit: number, currentPage: number, searchMess: string) {
    const queryParams = `?q=${searchMess}`;
    return this.http.get<Post[]>(
      API_POSTS_URL + queryParams)
      .pipe(
        delay(500),
        catchError(this.handleError));
  }


  getPostsByTag(postsLimit: number, currentPage: number, tag: string) {
    const queryParams = `?tag=${tag}`;
    return this.http.get<Post[]>(API_POSTS_URL + queryParams)
      .pipe(
        delay(500),
        map((posts: Post[]) => posts.filter((post: Post) => post.tags.indexOf(tag) > -1)),
        tap((posts: Post[]) => this.amountOfPosts.next(posts.length)),
        map((posts: Post[]) => this.paginate(postsLimit, currentPage, posts)),
        catchError(this.handleError)
      )
  }

  getPostsByCategory(postsLimit: number, currentPage: number, category: string) {
    const queryParams = `?category=${category}`;
    return this.http.get<Post[]>(API_POSTS_URL + queryParams)
      .pipe(
        delay(500),
        map((posts: Post[]) => posts.filter((post: Post) => post.categories.indexOf(category) > -1)),
        tap((posts: Post[]) => this.amountOfPosts.next(posts.length)),
        map((posts: Post[]) => this.paginate(postsLimit, currentPage, posts)),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  fetchPostsByCategories(posts?: Post[]) {
    if (posts) {
      const objCategories = this.countCategories(posts);
      this.categoriesAmounts.next(objCategories);
    }
    this.http.get<Post[]>(API_POSTS_URL)
      .subscribe((posts: Post[]) => {
        const objCategories = this.countCategories(posts);
        this.categoriesAmounts.next(objCategories);
      })
  }

  private countCategories(posts: Post[]) {
    let objCategories: { [catName: string]: number } = {};
    posts.map(
      (post: Post) => {
        for (let category of post.categories) {
          if (!(category in objCategories)) {
            objCategories[category] = 1;
          } else {
            objCategories[category] = objCategories[category] + 1;
          }
        }
      }
    )
    return objCategories;
  }

  private paginate(limitPosts: number, currentPage: number, posts: Post[]): Post[] {
    if (posts.length === 0) return posts;

    const totalPosts = posts.length;
    const totalPages = totalPosts % limitPosts === 0 ? totalPosts / limitPosts : Math.floor(totalPosts / limitPosts) + 1;
    let start: number;
    let end: number;

    if (currentPage !== totalPages) {
      start = (limitPosts * currentPage) - limitPosts;
      end = limitPosts * currentPage;
      return posts.slice(start, end);
    } else {
      start = (limitPosts * (currentPage - 1));
      return posts.slice(start);
    }
  }


  public generateID(): string {
    const id = UUID.UUID();
    return id;
  }

}


