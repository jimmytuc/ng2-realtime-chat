
import {MessageService} from "./services/message.service";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {HTTP_PROVIDERS} from "@angular/http";
import {AppComponent} from "./app.component";
import {RegisterService} from "./services/register.service";

//noinspection TypeScriptValidateTypes
bootstrap(AppComponent, [HTTP_PROVIDERS, MessageService, RegisterService]);

