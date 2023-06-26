import React, { useRef, useState } from "react";
import { OpenAIApi, Configuration } from "openai";
import googleLogo from "./css/Google.svg";
import "./css/style.css";

const apiKey = "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";
const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

const App = () => {
  const [user, setUser] = useState(null);
  const inp = useRef(null);
  const last = useRef(null);
  const chats = useRef(null);

  const msgs = [];
  msgs.reverse();

  const handleSignIn = () => {
    console.log("hello");
  };

  const handleSend = () => {
    if (inp.current.value) {
      let userMsg = inp.current.value;
      openai
        .createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: userMsg,
            },
          ],
        })
        .then((res) => {
          msgs.unshift({
            sender: res.choices[0].messages.role,
            msg: res.choices[0].messages.content,
          });
        });
      console.log(inp.current.value);
      last.current.scrollIntoView();
    }
  };
  return (
    <div className="wrapper">
      <div className="navbar">
        <div>
          <div className="logo">SendInPurple</div>
          {user ? (
            <img src="user.protoURL" alt="" />
          ) : (
            <img
              onClick={handleSignIn}
              src={googleLogo}
              style={{ width: "25px" }}
              alt="sadf"
            />
          )}
        </div>
      </div>

      <div className="chats" ref={chats}>
        {msgs.map((item, index) => {
          return (
            <div className={item.sender == "user" ? "me" : "you"} key={index}>
              <div className="msg">{item.msg}</div>
            </div>
          );
        })}

        <div ref={last}></div>
      </div>
      <div className="send-msg">
        <div>
          <input
            ref={inp}
            type="text"
            name=""
            placeholder="Type your message"
            id=""
          />
          <button className="send" onClick={handleSend}>
            <span className="icon">send</span>
          </button>
        </div>
        <div style={{ fontSize: "0.7rem", textAlign: "center" }}>
          This project is not running as I ran out of tokens from openAI
        </div>
      </div>
    </div>
  );
};

export default App;
