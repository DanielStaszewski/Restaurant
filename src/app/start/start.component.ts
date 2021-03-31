import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { CustomerOpinion } from 'src/models/customer-opinion.model';
import { Meal } from 'src/models/meal.model';
import { Post } from 'src/models/post.model';
import { StartService } from './start.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {


  recentPosts: Post[];
  customerOpinions: CustomerOpinion[];
  meals: Meal[];
  loading = false;

  //carousel
  @ViewChild('carousel') carousel: NgbCarousel;
  activeSlideOnCarousel = 1;
  intervalCarousel = 2000;

  constructor(private startService: StartService, private router: Router) {

  }

  ngOnInit(): void {
    this.fetchRecentPosts();
    this.fetchCustomerOpinions();
    this.fetchMeals();
  }

  private fetchRecentPosts(){
    this.loading = true;
    this.startService.getRecentPosts()
      .subscribe(
        (posts: Post[]) => {
          this.loading = false;
          this.recentPosts = posts;
        }
      )
  }

  private fetchCustomerOpinions(){
    this.loading = true;
    this.startService.getCustomerOpinions()
      .subscribe(
        (opinions: CustomerOpinion[]) => {
          this.loading = false;
          this.customerOpinions = opinions;
        }
      )
  }

  private fetchMeals(){
    this.loading = true;
    this.startService.getMeals()
      .subscribe(
        (meals: Meal[]) => {
          this.loading = false;
          this.meals = meals;
        }
      )
  }

  onShowPostDetails(id: number){
    this.router.navigate(['/blog', id]);
  }

  onSlid(slide: NgbSlideEvent){
    this.activeSlideOnCarousel = +slide.current;
  }

  getOpinion(id: string){
    this.carousel.interval = 0;
    this.carousel.select(id);
    this.carousel.interval = 2000;
  }

  
}
