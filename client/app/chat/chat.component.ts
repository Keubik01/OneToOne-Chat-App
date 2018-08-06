import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router'
import { ChatService } from '../services/chat.service';
import { Message } from '../services/data-structures';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  // @ViewChild('chatInput') chatInput: ElementRef;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  public messages = [];
  public all_messages = [];
  public currentChatuser = {};
  public connection;
  public message;
  public routeParamsSub;
  public user_id;

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {

    this.scrollToBottom();
    this.user_id = this.router.url.split("/")[2];

    this.chatService.getAllMessage(this.user_id).subscribe((data:any) => {
      let messages;
        messages = data.messages.map(noti => {
          return noti;
        })
      this.all_messages = messages;
      this.currentChatuser = data.user;
    })

    this.chatService.getMessages();

    this.chatService.currentChatMessage.subscribe(currentMessage => {
      // if (currentMessage) {
        this.all_messages.push(currentMessage);
        this.scrollToBottom();
      // }
    })
    this.chatService.joinChannel();

  }

  // ngOnDestroy() {
  //   this.connection.unsubscribe();
  // }

  sendMessage() {
    let token = window.localStorage.getItem('token');

    console.log('ooo')

    this.chatService.sendMessage({admin_message: this.message, user_id: this.user_id, token: token});
    this.message = '';
  }

  scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollBottom = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }
    }

  // @HostListener('click')
  // public autofocusInput() {
  //   this.chatInput.nativeElement.focus();
  // }
}
