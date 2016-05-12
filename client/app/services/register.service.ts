
import {Injectable, OnInit} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Room} from "../models/room.model";

@Injectable()

export class RegisterService{
    
    constructor(private _http:Http){
        
    }
    
    getRooms(){
        
        return this._http.get("/rooms")
            .map(res => res.json())
    }

    createRoom(room:Room){

        let headers = new Headers();
        headers.append("Content-Type","application/json");
        return this._http.post("/rooms", JSON.stringify({room:room}), {headers:headers})
            .map(res => res.status)
    }
}