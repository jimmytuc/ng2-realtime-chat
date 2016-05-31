
import {Component, ViewChild, ElementRef, EventEmitter} from "@angular/core";
import {LocalStorage} from "../../services/localStorage.service";
import {OnInit} from "../../../../build/lib/node_modules/@angular/core/esm/src/metadata/lifecycle_hooks";
import {RegisterService} from "../../services/register.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {Room} from "../../models/room.model";
import {MODAL_DIRECTIVES, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

declare var jQuery:any;

@Component({
    selector:"register",
    templateUrl:"app/components/registerForm/register.html",
    providers:[LocalStorage, UserService],
    directives:[MODAL_DIRECTIVES],
    outputs:['userRegistered'],
    styles:[`
        .registerform-style{
            margin-top:10%;
        }
        .custom-alert{
           position:absolute;
           right:10px;
           top:10px;
           transition: all 1s ease;
           transition:opacity 1s linear;*
        }
    `]
})

export class RegisterFormComponent implements OnInit{

    displayRegisterForm:boolean;
    nickName:string;
    newRoom:Room;
    room:string;
    rooms:Array<any>;
    showRegisterMessage:boolean;
    registermessage:string;
    messageTimeout;
    userRegistered = new EventEmitter<boolean>();

    constructor(private _localStorage:LocalStorage, private _registerService:RegisterService, private _userService:UserService, private _elementRef:ElementRef){
        this.displayRegisterForm = false;
        this.showRegisterMessage = false;
    }

    ngOnInit():any{
        
        if(!this._localStorage.isUserRegister()){
            this.displayRegisterForm = true;
        }
        
        this._registerService.getRooms()
            .subscribe(data => this.rooms=data);

        this._registerService.rooms.subscribe(room => {
            this.rooms.push(room);
            this.showRegisterMessage = true;
            this.registermessage = "room "+ room +" added successfully";
            if(typeof this.messageTimeout !== "undefined"){
                clearTimeout(this.messageTimeout);
            }
            this.messageTimeout = setTimeout(()=>{
                this.showRegisterMessage = false;
            },5000);
            jQuery(this._elementRef.nativeElement).find("#registerMessage").removeClass("alert-danger");
            jQuery(this._elementRef.nativeElement).find("#registerMessage").addClass("alert-success");
        },err=>{
            console.log("sfdsfds");
        })
    }
    
    onSubmit(){

        let nickName = this.nickName,
            room = this.room;

        let current_user = new User(nickName),
            current_room = new Room(room);

        this._localStorage.setUser(current_user);
        this._localStorage.setRoom(current_room);
        this.userRegistered.emit(true);

    }
    
    CreateRoom(){

        this._registerService.createRoom(this.newRoom)
            .subscribe(res => {
                if(res == 200){

                }
            }, err => {
                 if(err.status == 400){
                     this.showRegisterMessage = true;
                     this.registermessage = "room already exist!";
                     if(typeof this.messageTimeout !== "undefined"){
                         clearTimeout(this.messageTimeout);
                     }
                     this.messageTimeout = setTimeout(()=>{
                         this.showRegisterMessage = false;
                     },5000);
                     jQuery(this._elementRef.nativeElement).find("#registerMessage").removeClass("alert-success");
                     jQuery(this._elementRef.nativeElement).find("#registerMessage").addClass("alert-danger");
                 }
            })
    }
}