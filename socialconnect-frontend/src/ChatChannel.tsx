import { useState, useEffect, useRef } from "react";
import {over} from 'stompjs'
import SockJS from "sockjs-client";

const ChatChannel = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    receiver: "",
    chatMessage: "",
    chatJoined: false,
  });

  const client = useRef({});

  const [publicMessage, setPublicMessage] = useState<any[]>();
  const currentTime = new Date();

  const [chatTab, setChatTab] = useState("PUBLIC-GROUP");
  const [privateMessage, setPrivateMessage] = useState(new Map());
  const userList = useRef([]);

  const socketConnect = () => {
    const url = new SockJS("http://localhost:8080/web-socket");
    client.current = over(url);
    client.current.connect({}, connectCallback, errorCallback);
  };

  const errorCallback = (e) => {
    console.log(e);
  };

  const connectCallback = () => {
    setUserInfo({ ...userInfo, chatJoined: true });
    client.current.subscribe(
      "/user/" + userInfo.username + "/private",
      privateChatCallBack
    );
    client.current.subscribe("/group/public", publicChatCallBack);
    userConnected();
  };

  const userConnected = () => {
    var message = {
      senderName: userInfo.username,
      chatStatus: "USER_JOINED",
      date:
        currentTime.getHours().toString().padStart(2, "0") +
        ":" +
        currentTime.getMinutes().toString().padStart(2, "0") +
        ":" +
        currentTime.getSeconds().toString().padStart(2, "0"),
    };
    client.current.send("/application/message", {}, JSON.stringify(message));
  };

  const publicChatCallBack = (payload:any) => {
    //data from backend server
    var payloadBody: any = JSON.parse(payload.body);
    switch (payloadBody.chatStatus) {
      case "USER_JOINED":
        if (!privateMessage.get(payloadBody.senderName)) {
          privateMessage.set(payloadBody.senderName, []);
          setPrivateMessage(new Map(privateMessage));
        }
        break;
      case "USER_MESSAGE":
        publicMessage.push(payloadBody);
        setPublicMessage([...publicMessage]);
        break;
    }
  };

  const privateChatCallBack = (payload:any) => {
    var payloadBody = JSON.parse(payload.body);
    if (privateMessage.get(payloadBody.senderName)) {
      privateMessage.get(payloadBody.senderName).push(payloadBody);
      setPrivateMessage(new Map(privateMessage));
    } else {
      userList.current.push(payloadBody);
      privateMessage.set(payloadBody.senderName, userList.current);
      setPrivateMessage(new Map(privateMessage));
    }
  };

  const onChangeUsername = (e) => {
    setUserInfo({ ...userInfo, username: e.target.value });
  };

  const handleSubmitUsername = () => {
    socketConnect();
  };

  const onChangeMessage = (e) => {
    setUserInfo({ ...userInfo, chatMessage: e.target.value });
  };

  const handleSendPublicMessage = () => {
    if (client.current) {
      var chatBody = {
        senderName: userInfo.username,
        message: userInfo.chatMessage,
        chatStatus: "USER_MESSAGE",
        date:
          currentTime.getHours().toString().padStart(2, "0") +
          ":" +
          currentTime.getMinutes().toString().padStart(2, "0") +
          ":" +
          currentTime.getSeconds().toString().padStart(2, "0"),
      };
      client.current.send("/application/message", {}, JSON.stringify(chatBody));
      setUserInfo({ ...userInfo, chatMessage: "" });
    }
  };

  const handleSendPrivateMessage = () => {
    if (client.current) {
      var chatBody = {
        senderName: userInfo.username,
        receiverName: chatTab,
        message: userInfo.chatMessage,
        chatStatus: "USER_MESSAGE",
        date:
          currentTime.getHours().toString().padStart(2, "0") +
          ":" +
          currentTime.getMinutes().toString().padStart(2, "0") +
          ":" +
          currentTime.getSeconds().toString().padStart(2, "0"),
      };
      if (userInfo.username !== chatTab) {
        privateMessage.get(chatTab).push(chatBody);
        setPrivateMessage(new Map(privateMessage));
      }

      client.current.send(
        "/application/private-message",
        {},
        JSON.stringify(chatBody)
      );
      setUserInfo({ ...userInfo, chatMessage: "" });
    }
  };

  return (
    <div className="container">
      {userInfo.chatJoined ? (
        <div className="container">
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="card chat-app">
                <div id="plist" className="people-list">
                  <ul className="list-unstyled chat-list mt-2 mb-0">
                    <li
                      onClick={() => {
                        setChatTab("PUBLIC-GROUP");
                      }}
                      className={`clearfix ${
                        chatTab === "PUBLIC-GROUP" && "active"
                      }`}
                    >
                      <img src="/group.jpg" alt="avatar" />
                      <div className="about">
                        <div className="name">PUBLIC-GROUP</div>
                      </div>
                    </li>

                    {/* MEMBERS */}
                    {[...privateMessage.keys()].map((i, j) => (
                      <li
                        onClick={() => {
                          setChatTab(i);
                        }}
                        key={j}
                        className={`clearfix ${chatTab === i && "active"}`}
                      >
                        <img src="/user.svg" alt="avatar" />
                        <div className="about">
                          <div className="name">{i}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {chatTab === "PUBLIC-GROUP" && (
                  <div className="chat">
                    <div className="chat-history">
                      {publicMessage.map((i, j) => (
                        <ul key={j} className="m-b-0">
                          <li className="clearfix">
                            <div className="message-data">
                              <span className="message-data-time">
                                {i.date} -- From:{" "}
                                {i.senderName !== userInfo.username && (
                                  <span style={{ fontWeight: "bold" }}>
                                    {i.senderName}
                                  </span>
                                )}
                                {i.senderName === userInfo.username && (
                                  <span style={{ fontWeight: "bold" }}>
                                    Yourself-message
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className="message other-message float-left">
                              {i.message}
                            </div>
                          </li>
                        </ul>
                      ))}
                    </div>

                    <div className="chat-message clearfix">
                      <div className="input-group mb-0">
                        <input
                          value={userInfo.chatMessage}
                          onChange={onChangeMessage}
                          type="text"
                          className="form-control"
                          placeholder="Enter message here..."
                        />
                        <div className="input-group-prepend">
                          <button
                            onClick={handleSendPublicMessage}
                            className="input-group-text"
                          >
                            SEND
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {chatTab !== "PUBLIC-GROUP" && (
                  <div className="chat">
                    <div className="chat-history">
                      {[...privateMessage.get(chatTab)].map((i, j) => (
                        <ul key={j} className="m-b-0">
                          <li className="clearfix">
                            <div className="message-data">
                              <span className="message-data-time">
                                {i.date} -- From:{" "}
                                {i.senderName !== userInfo.username && (
                                  <span style={{ fontWeight: "bold" }}>
                                    {i.senderName}
                                  </span>
                                )}
                                {i.senderName === userInfo.username && (
                                  <span style={{ fontWeight: "bold" }}>
                                    Yourself-message
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className="message other-message float-left">
                              {i.message}
                            </div>
                          </li>
                        </ul>
                      ))}
                    </div>

                    <div className="chat-message clearfix">
                      <div className="input-group mb-0">
                        <input
                          value={userInfo.chatMessage}
                          onChange={onChangeMessage}
                          type="text"
                          className="form-control"
                          placeholder="Enter message here..."
                        />
                        <div className="input-group-prepend">
                          <button
                            onClick={handleSendPrivateMessage}
                            className="input-group-text"
                          >
                            SEND
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="register">
          <input
            placeholder="Enter username..."
            value={userInfo.username}
            onChange={onChangeUsername}
          />
          <button onClick={handleSubmitUsername}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default ChatChannel;