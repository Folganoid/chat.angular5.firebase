import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase/app';

import {ChatMessage} from '../models/chat-message.model';


@Injectable()
export class ChatService {

    user: any;
    chatMessages: AngularFireList<ChatMessage[]>;
    chatMessage: ChatMessage;
    userName: Observable<string>;

    constructor(private db: AngularFireDatabase,
                private afAuth: AngularFireAuth) {

      //  this.afAuth.authState.subscribe(auth => {
      //      if (auth !== undefined && auth !== null) {
      //          this.user = auth;
      //      }
      //  })
    }

    sendMessage(msg: string) {
        const timeStamp = this.getTimeStamp();
        //const email = this.user.email;
        const email = "test";
        this.chatMessages = this.getMessages();
        this.chatMessages.push({
            message: msg,
            timeSent: timeStamp,
            //userName: this.userName,
            userName: "242234",
            email: email,
        });

    }

    getMessages(): AngularFireList<ChatMessage[]>
    {
        return this.db.list('messages', ref => ref.limitToLast(25).orderByKey());
    }


    getTimeStamp() {
        const now = new Date();
        const date = now.getUTCFullYear() + '/' +
                    (now.getUTCMonth() + 1) + '/' +
                    now.getUTCDate();

        const time = now.getUTCHours() + ':' +
                    now.getUTCMinutes() + ':' +
                    now.getUTCSeconds();

        return (date + ' ' + time);
    }




}
