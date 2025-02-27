import { useState } from "react";
import { useInstanceConfig } from "../hooks/InstanceConfig";
import Input, { InputValueType } from "./shared/Input";
import { TabList, useTabs } from "./shared/Tabs";
import Button from "./shared/Button";

function Instance() {
  const { setTabIndex } = useTabs();
  const { config, setConfig } = useInstanceConfig();

  const [instanceId, setInstanceId] = useState<InputValueType>(
    config.idInstance
  );
  const [apiTokenInstance, setApiTokenInstance] = useState<InputValueType>(
    config.apiTokenInstance
  );

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setTabIndex(config.recipient ? TabList.Chat : TabList.Recipient);
  };

  const onIdInstanceChange = (event: React.BaseSyntheticEvent) => {
    setInstanceId(event.target.value);
    setConfig((prev) => ({
      ...prev,
      idInstance: event.target.value,
    }));
  };

  const onApiTokenInstanceChange = (event: React.BaseSyntheticEvent) => {
    setApiTokenInstance(event.target.value);
    setConfig((prev) => ({
      ...prev,
      apiTokenInstance: event.target.value,
    }));
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center justify-center max-h-90vh max-w-90vw overflow-hidden min-w-4xl md:min-w-2xl sm:min-w-80vw md:min-w-2xl sm:min-w-80 m-auto px-24 py-12 gap-6 rounded-4xl shadow-md bg-emerald-50"
    >
      <h1 className="font-bold text-xl font-bold text-emerald-950">
        Enter Green-API instance details to start chat
      </h1>

      <Input
        type="text"
        placeholder="instanceId"
        label="Enter your instanceId"
        value={instanceId}
        onChange={(e) => onIdInstanceChange(e)}
      />
      <Input
        type="password"
        placeholder="apiTokenInstance"
        label="Enter your apiTokenInstance"
        value={apiTokenInstance}
        onChange={(e) => onApiTokenInstanceChange(e)}
      />

      <Button type="submit" disabled={!instanceId || !apiTokenInstance}>
        <span className="px-8">Auth</span>
      </Button>
    </form>
  );
}

export default Instance;
