export class User{

    constructor(private id: string, public username: string, public email: string, private _token: string, private _tokenExpirationDate: Date){}

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }

}