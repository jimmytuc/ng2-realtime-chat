
import {Injectable, OnInit} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/share';
import {Room} from "../models/room.model";

@Injectable()

export class RegisterService{
    
    rooms:Observable<any>;
    newRoom:Observer<any>;
    
    constructor(private _http:Http){

        this.rooms = new Observable(observer => this.newRoom=observer).share();
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