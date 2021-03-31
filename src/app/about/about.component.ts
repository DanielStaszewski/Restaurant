import { Component, OnInit } from '@angular/core';
import { Chef } from 'src/models/chef.model';
import { WhyChooseUs } from 'src/models/why-choose-us.model';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  chefs: Chef[];
  whyChooseUsItems: WhyChooseUs[];
  activeAccordionItem = 1;
  selectedItem: number;
  isCardOpened: boolean;
  loading = false;

  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    this.fetchChefs();
    this.fetchWhyChooseUs();
  }

  private fetchChefs(): void{
    this.loading = true;
    this.aboutService.getChefs()
      .subscribe(
        (chefs: Chef[]) => {
          this.loading = false;
          this.chefs = chefs;
        }
      )
  }

  private fetchWhyChooseUs(): void{
    this.loading = true;
    this.aboutService.getWhyChooseUs()
      .subscribe(
        (whyChooseUsItems: WhyChooseUs[]) => {
          this.loading = false;
          this.whyChooseUsItems = whyChooseUsItems;
        }
      )
  }

  toggleAccordionItem(id: number): void{
    if(id === this.activeAccordionItem){
      this.activeAccordionItem = null;
    } else{
      this.activeAccordionItem = id;
    }
  }

}
