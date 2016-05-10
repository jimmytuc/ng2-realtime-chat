
import {User} from "./user.model";
import {Room} from "./room.model";

export class Message{

    text:string;
    createdDate:Date;
    room:Room;
    user:User;

    constructor(public message:string, public _user:User, public _room?:Room){

        this.text = message;
        this.createdDate = new Date();
        this.room = _room;
        this.user = _user;
    }
    
}