import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

    isLogged = false;
    openedDropdown = false;
    isSidedrawerOpened = false;
    username: string;
    private userSub: Subscription;

    constructor(private authService: AuthService, private router: Router) {

    }

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(
            user => {
                if (user) {
                    this.isLogged = true;
                    this.username = user.username;
                    console.log(this.isLogged);
                } else if (!user) {
                    this.isLogged = false;
                    this.openedDropdown = false;

                }
            }
        );
    }

    reloadCurrentRoute(route: string) {
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
                console.log(this.isLogged);
                this.router.navigateByUrl(route);
            });
    }

    logout(): void {
        this.isLogged = false;
        this.openedDropdown = false;
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

}