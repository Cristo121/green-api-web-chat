import { InstanceConfig } from "./InstanceConfig";

export function useGreenApi(config: InstanceConfig) {
  const api = {
    getWaSettings: `${config.apiUrl}/waInstance${config.idInstance}/getWaSettings/${config.apiTokenInstance}`,
    sendMessage: `${config.apiUrl}/waInstance${config.idInstance}/sendMessage/${config.apiTokenInstance}`,
    receiveNotification: `${config.apiUrl}/waInstance${config.idInstance}/receiveNotification/${config.apiTokenInstance}`,
    deleteNotification: (receiptId: string) =>
      `${config.apiUrl}/waInstance${config.idInstance}/deleteNotification/${config.apiTokenInstance}/${receiptId}`,
  };

  return {
    ...api,
  };
}
