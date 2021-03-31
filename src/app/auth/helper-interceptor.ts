import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { UUID } from 'angular2-uuid';


@Injectable()
export class HelpHttpInterceptor implements HttpInterceptor{

    private _users = [
        //start user
        {id: "fsdfsdff4", username: "Daniel", email: "daniel@wp.pl", password: "daniel"}
    ]; 
    private _token = 'FAKE JWT TOKEN';
    private _tokenDuration = 1 * 60 * 60 * 1000;

    constructor(){
    }
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return this.handleRequests(req, next);
    }

    handleRequests(req: HttpRequest<any>, next: HttpHandler): any{
        const { url, method, body } = req;
        switch(true){
            case url.endsWith("auth/register") && method === "POST":
                return this.register(body);
            case url.endsWith("auth/login") && method === "POST":
                return this.login(body);
            default: 
                return next.handle(req);
        }
    }

    register(body){
        const user = body;
        if(this._users.find(x => x.email === user.email)){
            return this.error('Email already exist');
        }
        if(this._users.find(x => x.username === user.username)){
            return this.error('Username already exist');
        }
        const id = this.generateID();
        this._users.push({id, ...user});
        console.log({id, ...user});
        return this.ok();
    }

    login(body) {
        const { email, password } = body;
        const user = this._users.find(x => x.email === email && x.password === password);
        if (!user) return this.error('Username or password is incorrect');
        return this.ok({
            id: user.id,
            username: user.username,
            email: user.email,
            token: this._token,
            expiresIn: this._tokenDuration
        })
    }

    error(message: string){
        return throwError({error: message});
    }

    ok(body?) {
        return of(new HttpResponse({ status: 200, body }))
    }

    generateID(): string {
        const id = UUID.UUID();
        return id;
      }
}

export const HelperProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HelpHttpInterceptor,
    multi: true
};

