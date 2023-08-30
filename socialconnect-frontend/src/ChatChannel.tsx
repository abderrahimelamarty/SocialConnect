// 
import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const ChatChannel: React.FC = () => {
  let stompClient: Stomp.Client | null = null;
  let privateStompClient: Stomp.Client | null = null;

  useEffect(() => {
    const connectStomp = () => {
      const socket = new SockJS('/ws');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, (frame:any) => {
        console.log(frame);
        stompClient.subscribe('/all/messages', (result:any) => {
          show(JSON.parse(result.body));
        });
      });
    };

    const connectPrivateStomp = () => {
      const socket = new SockJS('/ws');
      privateStompClient = Stomp.over(socket);
      privateStompClient.connect({}, (frame:any) => {
        console.log(frame);
        privateStompClient.subscribe('/user/specific', (result:any) => {
          console.log(result.body);
          show(JSON.parse(result.body));
        });
      });
    };

    const sendMessage = () => {
      const text = document.getElementById('text')!.value;
      stompClient?.send('/app/application', {}, JSON.stringify({ 'text': text }));
    };

    const sendPrivateMessage = () => {
      const text = document.getElementById('privateText')!.value;
      const to = document.getElementById('to')!.value;
      privateStompClient?.send('/app/private', {}, JSON.stringify({ 'text': text, 'to': to }));
    };

    const show = (message: any) => {
      const response = document.getElementById('messages')!;
      const p = document.createElement('p');
      p.innerHTML = 'message: ' + message.text;
      response.appendChild(p);
    };

    connectStomp();
    connectPrivateStomp();
  }, []);

  return (
    <div>
      <div>
        <button id="sendMessage" onClick={sendMessage}>Send</button>
        <input type="text" id="text" placeholder="Text" />
      </div>
      <br />
      <div>
        <button id="sendPrivateMessage" onClick={sendPrivateMessage}>Send Private</button>
        <input type="text" id="privateText" placeholder="Private Message" />
        <input type="text" id="to" placeholder="To" />
      </div>
      <br />
      <br />
      <br />

      <div id="messages"></div>
    </div>
  );
};

export default ChatChannel;
