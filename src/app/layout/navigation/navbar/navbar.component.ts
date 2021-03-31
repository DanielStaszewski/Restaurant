import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() isLogged = false;
  @Input() username: string;
  @Input() openedDropdown = false;
  @Output() reloadPage =  new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();

 
  constructor() { }

  ngOnInit(): void {
  }

  onReloadCurrentRoute(route: string): void {
    this.reloadPage.emit(route);
  }

  toggleDropdown(): void {
    this.openedDropdown = !this.openedDropdown;
  }

  onLogout(): void {
    this.logout.emit();
  }

}
