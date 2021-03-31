import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidedrawer',
  templateUrl: './sidedrawer.component.html',
  styleUrls: ['./sidedrawer.component.scss']
})
export class SidedrawerComponent implements OnInit {


  isSidedrawerOpened = false;
  @Input() isLogged = false;
  @Input() username: string;
  @Output() reloadPage =  new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidedrawer(){
    this.isSidedrawerOpened = !this.isSidedrawerOpened;
  }

  onReloadCurrentRoute(route: string): void {
    this.isSidedrawerOpened = false;
    this.reloadPage.emit(route);
  }

  onLogout(): void {
    this.isSidedrawerOpened = false;
    this.logout.emit();
  }

}
