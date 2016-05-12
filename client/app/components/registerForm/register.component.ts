
import {Component} from "@angular/core";
import {LocalStorage} from "../../services/localStorage.service";
import {OnInit} from "../../../../build/lib/node_modules/@angular/core/esm/src/metadata/lifecycle_hooks";
import {RegisterService} from "../../services/register.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";

@Component({
    selector:"register",
    templateUrl:"app/components/registerForm/register.html",
    providers:[LocalStorage, RegisterService, UserService],
    styles:[`
        .registerform-style{
            margin-top:25%;
        }
    `]
})

export class RegisterFormComponent implements OnInit{

    displayForm:boolean;
    nickName:string;
    room:string;
    rooms:Array<any>;

    constructor(private _localStorage:LocalStorage, private _registerService:RegisterService, private _userService:UserService){
        this.displayForm = false;
    }

    ngOnInit():any{

        if(!this._localStorage.isUserRegister()){
            this.displayForm = true;
        }
        
        this._registerService.getRooms()
            .subscribe(data => this.rooms=data)
    }
    
    onSubmit(){

        let nickName = this.nickName,
            room = this.room;

        let user = new User(nickName);
        this._userService.registerUser(user)
            .subscribe(res => console.log(res));
    }
}