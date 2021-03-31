import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay } from "rxjs/operators";
import { Chef } from "src/models/chef.model";
import { WhyChooseUs } from "src/models/why-choose-us.model";

const API_CHEFS_URL = "http://localhost:3000/chefs";
const API_WHY_CHOOSE_US_URL = "http://localhost:3000/why-choose-us";

@Injectable({providedIn: 'root'})
export class AboutService {
    constructor(private http: HttpClient){}

    getChefs(){
        return this.http.get<Chef[]>(API_CHEFS_URL)
            .pipe(
                delay(1000)
            )
    }

    getWhyChooseUs(){
        return this.http.get<WhyChooseUs[]>(API_WHY_CHOOSE_US_URL)
            .pipe(
                delay(1000)
            )
    }
}
