import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './directives/placeholder.directive';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public closeSub: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }


  showAlert(alertHost: PlaceholderDirective, message: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const alertRef = hostViewContainerRef.createComponent(alertCmpFactory);
    alertRef.instance.message = message;
    this.closeSub = alertRef.instance.close.subscribe( () => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
    });
  }
}
