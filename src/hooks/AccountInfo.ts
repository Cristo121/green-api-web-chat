import { useCallback, useRef, useState } from "react";
import { useGreenApi } from "./GreenApi";
import { useInstanceConfig } from "./InstanceConfig";
import axios from "axios";

interface AccountInfo {
  avatar: string;
  phone: string;
  stateInstance: string;
  deviceId: string;
}

export function useAccountInfo() {
  const { config } = useInstanceConfig();
  const { getWaSettings } = useGreenApi(config);
  const [authorized, setAuthorized] = useState(false);

  const account = useRef<AccountInfo>({
    avatar: "",
    phone: "",
    stateInstance: "notAuthorized",
    deviceId: "",
  });

  const load = useCallback(() => {
    return axios.get<AccountInfo>(getWaSettings).then(({ data }) => {
      setAuthorized(data.stateInstance === "authorized");
      account.current = {
        ...account.current,
        ...data,
      };
    });
  }, [getWaSettings]);

  return {
    authorized: authorized,
    account: account.current,
    load,
  };
}
