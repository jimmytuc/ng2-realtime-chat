
import {Directive, OnInit} from "@angular/core";
import {User} from "../models/user.model";
import {ElementRef} from "@angular/core";
import {LocalStorage} from "../services/localStorage.service";

declare var jQuery:any ;

@Directive({
    selector:"[MessageLocation]",
    inputs:["user:MessageLocation"],
    providers:[LocalStorage]
})

export class MessageLocationDirective implements OnInit{

    user:User;

    constructor(private _elementRef:ElementRef, private _localStorageService:LocalStorage){
        
    }
    
    ngOnInit():any{
        
        let user = this._localStorageService.getUser();
        
        if(user.nickName == this.user.nickName){
            jQuery(this._elementRef.nativeElement).css({"display":"none"});
        }else{
            jQuery(this._elementRef.nativeElement).addClass("pull-left");
        }
    }
}