
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {User} from "../models/user.model";
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{
    
    constructor(private _http:Http){
        
    }
    
    registerUser(user:User){
        let headers = new Headers();
        headers.append("Content-Type","application/json");
        return this._http.post("/user", JSON.stringify({user:user}), {headers:headers})
            .map(res => res.json());
    }
}