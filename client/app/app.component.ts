
import {Component, OnInit} from "@angular/core";
import {ChatBoxComponent} from "./components/chatbox/chatbox.component";
import {MessageService} from "./services/message.service";
import * as io from 'socket.io-client';
import {RegisterService} from "./services/register.service";

@Component({

    selector:"app",
    template:"<chatbox></chatbox>",
    directives:[ChatBoxComponent]
})

export class AppComponent implements OnInit{

    socket:any;

    constructor(private _messageService:MessageService, private _registerService:RegisterService){

    }

    ngOnInit():any{
        this.socket = io.connect("http://localhost:3000");
        this.socket.on("newMessage", (message) => {
            this._messageService.listener.next(message);
        });
        this.socket.on("roomAdded", (rooms) => {
            this._registerService.newRoom.next(rooms);
        });
    }
}