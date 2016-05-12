
import {Component, OnInit} from "@angular/core";
import {ChatBoxComponent} from "./components/chatbox/chatbox.component";
import {MessageService} from "./services/message.service";
import * as io from 'socket.io-client';

@Component({

    selector:"app",
    template:"<chatbox></chatbox>",
    directives:[ChatBoxComponent]
})

export class AppComponent implements OnInit{

    socket:any;

    constructor(private _messageService:MessageService){

    }

    ngOnInit():any{
        this.socket = io.connect("http://localhost:3000");
        this.socket.on("newMessage", (message) => {
            this._messageService.listener.next(message);
        });
    }
}