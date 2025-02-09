import { useState } from "react";
import PlusIcon from "./icons/plus";
import Input from "./shared/Input";
import SendIcon from "./icons/send";

interface ChatFooterProps {
  sendMessage: (message: string) => void;
}

function ChatFooter({ sendMessage }: ChatFooterProps) {
  const [message, setMessage] = useState("");

  const onMessageSend = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <footer className="h-[64px] bg-slate-700 flex gap-4 justify-between w-screen py-2 px-4">
      <button className="cursor-pointer text-slate-500 hover:text-slate-400">
        {<PlusIcon />}
      </button>
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message..."
        className={[
          "bg-transparent truncate opacity-25 outline-2 outline-offset-1 outline-slate-500 rounded-lg",
          "border-1 h-[46px] text-slate-300 placeholder-slate-300 focus:outline-slate-300",
        ].join(" ")}
      />
      <button
        type="button"
        className="cursor-pointer text-slate-500 hover:text-slate-400"
        onClick={() => onMessageSend()}
      >
        <SendIcon />
      </button>
    </footer>
  );
}

export default ChatFooter;
