import { Stomp,CompatClient } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
function Notifications() {
  const [stompClient, setStompClient] = useState<CompatClient | undefined>()

  const user:any="hh";
  useEffect(() => {
    if (user) {
      const sock = new SockJS('http://localhost:8080/ws');
  setStompClient(Stomp.over(sock))
     if (stompClient){
      stompClient.connect({}, onError);
      stompClient.subscribe('/all/public', onPublicMessageReceived);
      stompClient.subscribe(`/user/${user.id}/private`, onPrivateMessageReceived);
    }
     }
      
  }, []);

  const onPublicMessageReceived = (payload: any) => {
    const payloadData = JSON.parse(payload.body);
    console.log(payloadData);
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const onPrivateMessageReceived = (payload: any) => {
    const payloadData = JSON.parse(payload);
    console.log(payloadData);
  };

  const handleSendPublicMessage = () => {
    if (stompClient) {
      const randomData: any = {
        data: 'random',
      };
      stompClient.send('/app/message', {}, JSON.stringify(randomData));
    }
  };
  return (
    <div>
     

    </div>
  )
}

export default Notifications