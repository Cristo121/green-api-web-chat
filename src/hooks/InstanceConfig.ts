import { useEffect, useState } from "react";

export enum LocalStorageKeys {
  config = "config",
}

export interface InstanceConfig {
  idInstance: string;
  apiUrl: string;
  apiTokenInstance: string;
  recipient: string;
}

export function useInstanceConfig() {
  const {
    apiTokenInstance = "",
    idInstance = "",
    recipient = "",
  } = JSON.parse(localStorage.getItem(LocalStorageKeys.config) || "");

  const [config, setConfig] = useState<InstanceConfig>({
    apiUrl: "api", //import.meta.env.VITE_API_GREEN_API_URL,
    apiTokenInstance,
    idInstance,
    recipient,
  });

  const setRecipient = (recipient: string) => {
    setConfig((config) => ({
      ...config,
      recipient,
    }));
  };

  useEffect(() => {
    if (config) {
      localStorage.setItem(LocalStorageKeys.config, JSON.stringify(config));
    } else {
      localStorage.removeItem(LocalStorageKeys.config);
    }
  }, [config]);

  return { config, setConfig, setRecipient };
}
