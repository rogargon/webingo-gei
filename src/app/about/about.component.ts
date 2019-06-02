import {Component} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  private stompClient;

  constructor() {
    this.initSocket();
  }

  private initSocket() {
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);

    const that = this;
    this.stompClient.connect({}, () => {
      var chatMessage = {
        sender: 'vergon',
        content: 'vergoide',
        type: 'CHAT'
      };
      this.stompClient.send('/app/chat.sendMessage' , {}, JSON.stringify(chatMessage));
      that.stompClient.subscribe('/topic/public', (message) => {
          that.onMessageReceived(message);
          console.log(message);
        });
    });
  }

  private onMessageReceived(payload) {
    const message = JSON.parse(payload.body);
    console.log('MESSAGE:', message);
  }

  private onConnected() {
    console.log(this.stompClient);
    this.stompClient.subscribe('/topic/public', this.onMessageReceived);
    this.stompClient.send('/app/chat.addUser',
      {},
      JSON.stringify({sender: 'user', type: 'JOIN'})
    );
  }

  private onError(error) {
      console.log('ERROR: ', error);
  }
}
