
import {Injectable, OnInit, Inject} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/share';
import {Message} from "../models/message.model";

@Injectable()
export class MessageService implements OnInit{

    message:Observable<any>;
    listener:Observer<any>;

    constructor(private _http:Http){

        this.message = new Observable(observer => this.listener = observer).share();
    }

    ngOnInit():any{
        this.listener.next("aaaaaaaa");
    }

    sendMessageServer(message:Message){
        let headers = new Headers();
        headers.append("Content-Type","application/json");
        return this._http.post("http://localhost:3000/messenger", JSON.stringify({messages:message}), {headers:headers})
            .subscribe(res => console.log(res));
    }
}