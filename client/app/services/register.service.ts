
import {Injectable, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()

export class RegisterService{
    
    constructor(private _http:Http){
        
    }
    
    getRooms(){
        
        return this._http.get("/rooms")
            .map(res => res.json())
    }
}