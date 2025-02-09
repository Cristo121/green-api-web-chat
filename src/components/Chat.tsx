import Message from "./shared/Message";

import { useMessages } from "../hooks/Messages";
import { useInstanceConfig } from "../hooks/InstanceConfig";

import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import { useEffect } from "react";

function Chat() {
  const { config } = useInstanceConfig();

  const { messages, sendMessage } = useMessages({
    receiveTimeout: import.meta.env.VITE_API_GREEN_API_RECEIVE_TIMEOUT,
    interval: import.meta.env.VITE_API_GREEN_API_RECEIVE_INTERVAL,
    instanceConfig: config,
  });

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  return (
    <div className="overflow-hidden w-screen h-screen flex flex-col">
      <ChatHeader recipient={config.recipient} />

      <section className="flex-1 flex flex-col overflow-y-auto p-2 justify-end gap-1">
        {messages.map((message) => (
          <Message
            {...message}
            recipient={config.recipient}
            key={message.messageId}
          />
        ))}
      </section>

      <ChatFooter sendMessage={sendMessage} />
    </div>
  );
}

export default Chat;
