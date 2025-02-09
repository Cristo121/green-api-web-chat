import { useRef } from "react";
import UserCircleIcon from "./icons/user-circle";
import Dropdown, { Option } from "./shared/Dropdown";
import { TabList, useTabs } from "./shared/Tabs";

interface ChatHeaderProps {
  recipient: string;
}
function ChatHeader({ recipient }: ChatHeaderProps) {
  const { setTabIndex } = useTabs();
  const options = useRef([{ label: "Close chat", value: "closeChat" }]);

  const closeChat = () => setTabIndex(TabList.Recipient);
  const onDropdownSelect = (option: Option) =>
    option.value === "closeChat" && closeChat();

  return (
    <header className="h-[64px] bg-slate-700 flex gap-2 justify-between w-screen p-2">
      <div className="flex items-center gap-2 text-slate-500">
        <UserCircleIcon />
        <span>{recipient}</span>
      </div>
      <Dropdown
        options={options.current}
        onSelect={onDropdownSelect}
      ></Dropdown>
    </header>
  );
}

export default ChatHeader;
