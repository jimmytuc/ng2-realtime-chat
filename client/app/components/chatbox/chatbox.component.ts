
import {Component, OnInit, ViewChild} from "@angular/core";
import {MessageService} from "../../services/message.service";
import {NgFor, NgIf} from "@angular/common";
import {Message} from "../../models/message.model";
import {LocalStorage} from "../../services/localStorage.service";
import {User} from "../../models/user.model";
import {RegisterFormComponent} from "../registerForm/register.component";


@Component({
    
    selector:"chatbox",
    templateUrl:"app/components/chatbox/chatbox.html",
    directives:[NgFor, NgIf, RegisterFormComponent],
    providers:[LocalStorage],
    styles:[`
        .chat
{
    list-style: none;
    margin: 0;
    padding: 0;
}

.chat li
{
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px dotted #B3A9A9;
}

.chat li.left .chat-body
{
    margin-left: 60px;
}

.chat li.right .chat-body
{
    margin-right: 60px;
}


.chat li .chat-body p
{
    margin: 0;
    color: #777777;
}

.panel .slidedown .glyphicon, .chat .glyphicon
{
    margin-right: 5px;
}

.panel-body
{
    overflow-y: scroll;
    height: 250px;
}

::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}

::-webkit-scrollbar
{
    width: 12px;
    background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
}
.chatbox-style{
    max-width:800px;
    width:100%;
    margin-top:7%;
}

    `]
})

export class ChatBoxComponent implements OnInit{

    allmessages:Array<any> = new Array();
    currentUser:User;
    nickname:string;
    isUserRegister:boolean;

    constructor(private _messageService:MessageService, private _localStorageService:LocalStorage){

    }

    ngOnInit():any{

        if(this._localStorageService.isUserRegister() && this._localStorageService.isRoomSelected()){
            this.isUserRegister = true;
        }else{
            this.isUserRegister = false;
        }
        this.currentUser = this._localStorageService.getUser();

        this._messageService.message.subscribe(data => {
            this.allmessages.push(data);
        })
    }

    sendMessage(message:string){
        let user=this._localStorageService.getUser(),
            text=message;
        let newMessage = new Message(message, user);
        this._messageService.sendMessageServer(newMessage);
    }

    registerUser(nickname:string){
        
        let user = new User(nickname);
        this._localStorageService.setUser(user);
    }
}