import { useEffect, useRef } from 'react';
import styles from "./Chat.module.css";

// Avatar components for better personalization
const UserAvatar = () => (
  <div className={styles.avatarUser}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  </div>
);

const BotAvatar = () => (
  <div className={styles.avatarBot}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zM7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5zM16 17H8v-2h8v2zm-1-4h-6v-2h6v2z" />
    </svg>
  </div>
);

export function Chat({ messages }) {
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format message content with new lines
  const formatContent = (text) => {
    return text.split('\n').map((line, i) => (
      <p key={i} className={styles.messageLine}>{line}</p>
    ));
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesWrapper}>
        {messages.map(({ role, content }, index) => (
          <div 
            key={index} 
            className={`${styles.message} ${role === 'user' ? styles.user : styles.assistant}`}
          >
            <div className={styles.avatarContainer}>
              {role === 'user' ? <UserAvatar /> : <BotAvatar />}
            </div>
            
            <div className={styles.messageContent}>
              <div className={styles.messageHeader}>
                <span className={styles.senderName}>
                  {role === 'user' ? 'You' : 'Assistant'}
                </span>
                <span className={styles.timestamp}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <div className={styles.messageBody}>
                {formatContent(content)}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}