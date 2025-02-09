import { useMemo } from "react";
import { ChatMessage } from "../../hooks/Messages";

interface MessageProps extends ChatMessage {
  recipient: string;
}
function Message({ message, timestamp, sender, recipient }: MessageProps) {
  const time = useMemo(() => {
    const date = new Date(timestamp);
    const minutes = date.getMinutes();

    return `${date.getHours()}:${minutes <= 9 && "0"}${minutes}`;
  }, [timestamp]);

  const incoming = `${recipient}@c.us` === sender.sender;

  return (
    <div
      className={[
        "flex gap-2 p-2 bg-emerald-800 text-slate-300 rounded-lg size-fit relative",
        incoming ? "mr-auto" : "ml-auto",
      ].join(" ")}
    >
      <div
        className={[
          "absolute top-0",
          incoming ? "left-[-8px]" : "right-[-8px]",
        ].join(" ")}
        style={{
          border: "8px solid transparent",
          borderTop: "8px solid #006045",
          borderLeft: `8px solid ${!incoming ? "#006045" : "transparent"}`,
          borderRight: `8px solid ${incoming ? "#006045" : "transparent"}`,
        }}
      ></div>

      <span>{message}</span>
      <span className="text-sm text-slate-400 self-end">{time}</span>
    </div>
  );
}

export default Message;
