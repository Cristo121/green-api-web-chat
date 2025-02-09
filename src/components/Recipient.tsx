import { useInstanceConfig } from "../hooks/InstanceConfig";

import Input, { InputValueType } from "./shared/Input";
import Button from "./shared/Button";
import { TabList, useTabs } from "./shared/Tabs";
import { useState } from "react";

function Recipient() {
  const { setTabIndex } = useTabs();
  const { config, setConfig } = useInstanceConfig();
  const [value, setValue] = useState<InputValueType>("");

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setTabIndex(TabList.Chat);
  };

  const onRecipientChange = (event: React.BaseSyntheticEvent) => {
    setValue(event.target.value);
    setConfig((prev) => ({ ...prev, recipient: event.target.value }));
  };

  return (
    <form
      onSubmit={submitHandler}
      className={[
        "flex flex-col items-center justify-center max-h-90vh max-w-90vw overflow-hidden min-w-4xl md:min-w-2xl",
        "sm:min-w-80vw md:min-w-2xl sm:min-w-80 m-auto px-24 py-12 gap-6 rounded-4xl shadow-md bg-emerald-50",
      ].join(" ")}
    >
      <h1>
        Enter phone the number of the person you want to start chatting with
      </h1>

      <Input
        initialValue={config.recipient}
        type="tel"
        value={value}
        placeholder="Enter phone number"
        onChange={onRecipientChange}
      />

      <div className="flex flex-row gap-[8px]">
        <Button type="submit">Start Chat</Button>
        <Button
          className="bg-grey-500"
          onClick={() => setTabIndex(TabList.Instance)}
        >
          Change Instance
        </Button>
      </div>
    </form>
  );
}

export default Recipient;
