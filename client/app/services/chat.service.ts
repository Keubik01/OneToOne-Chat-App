import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Message } from './data-structures';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class ChatService {
 // private url = 'http://localhost:3000';

  private socket;
  currentChatMessage = new BehaviorSubject({});
  AllChatmessages = new BehaviorSubject([]);

  constructor(private http: HttpClient, private router: Router) {
  }

  public sendMessage(message) {
    this.socket.emit('adminmessage', message);
  }

  public getAllMessage (id) {
    return this.http.get(`/api/getAllMessage/${id}`);
  }

  public joinChannel() {
    this.socket.emit('join', this.router.url.split("/")[2]);
  }

  public getMessages() {
      this.socket = io('http://192.168.1.6:4001');
      // this.socket = io('http://13.59.246.30:4000');
       this.socket.on('new msg', (message: Message) => {
       });
       this.socket.on('newmessage', (message:any) => {
         if (this.router.url.split("/")[2] === message.user_id) {
            this.currentChatMessage.next(message.msg);
         }
      });
      return () => {
        this.socket.disconnect();
      };
  }
}
