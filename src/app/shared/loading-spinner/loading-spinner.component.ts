import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: '<div class="backdrop d-flex justify-content-center align-items-center"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
