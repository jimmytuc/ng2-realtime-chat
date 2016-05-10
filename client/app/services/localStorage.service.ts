
import {Injectable} from "@angular/core";
import {Room} from "../models/room.model";
import {User} from "../models/user.model";

@Injectable()
export class LocalStorage{

    setUser(user:User){

        return localStorage.setItem("user", JSON.stringify(user));
    }

    getUser(){

        return JSON.parse(localStorage.getItem("user"));
    }

    setRoom(room:Room){

        return localStorage.setItem("room", JSON.stringify(room));
    }

    getRoom(){
        return JSON.parse(localStorage.getItem("room"));
    }

    isUserRegister(){
        return JSON.parse(localStorage.getItem("user"));
    }

    isRoomSelected(){
        return JSON.parse(localStorage.getItem("room"));
    }
}