import { useState } from "react";
import { Chat } from "./component/chat/chat";
import Snowfall from "./component/snow";
import style from "./component/app.module.css";

const MESSAGES = [
  {
    role: "user",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus voluptatibus ipsam illo eligendi obcaecati alias magni voluptate, corrupti adipisci quae esse fugiat nesciunt suscipit sunt laboriosam fuga aperiam sed. Sint?",
  },
  {
    role: "assistant",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus voluptatibus ipsam illo eligendi obcaecati alias magni voluptate, corrupti adipisci quae esse fugiat nesciunt suscipit sunt laboriosam fuga aperiam sed. Sint?",
  },
  {
    role: "user",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus voluptatibus ipsam illo eligendi obcaecati alias magni voluptate, corrupti adipisci quae esse fugiat nesciunt suscipit sunt laboriosam fuga aperiam sed. Sint?",
  },
  {
    role: "assistant",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus voluptatibus ipsam illo eligendi obcaecati alias magni voluptate, corrupti adipisci quae esse fugiat nesciunt suscipit sunt laboriosam fuga aperiam sed. Sint?",
  },
  {
    role: "user",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus voluptatibus ipsam illo eligendi obcaecati alias magni voluptate, corrupti adipisci quae esse fugiat nesciunt suscipit sunt laboriosam fuga aperiam sed. Sint?",
  },
  {
    role: "assistant",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus voluptatibus ipsam illo eligendi obcaecati alias magni voluptate, corrupti adipisci quae esse fugiat nesciunt suscipit sunt laboriosam fuga aperiam sed. Sint?",
  },
  {
    role: "user",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus voluptatibus ipsam illo eligendi obcaecati alias magni voluptate, corrupti adipisci quae esse fugiat nesciunt suscipit sunt laboriosam fuga aperiam sed. Sint?",
  },
  {
    role: "assistant",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus voluptatibus ipsam illo eligendi obcaecati alias magni voluptate, corrupti adipisci quae esse fugiat nesciunt suscipit sunt laboriosam fuga aperiam sed. Sint?",
  },
];

function App() {
  const [messages, setMessages] = useState(MESSAGES);

  return (
    <div className={style.App}>
      <Snowfall />
      <header className={style.Header}>
        <img className={style.Logo} src="/chat-bot.png" alt="logo" />
        <h1 className={style.Title}>AI Chatbot</h1>
      </header>
      <div className={style.ChatContainer}>
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
