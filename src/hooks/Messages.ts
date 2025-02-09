import { useEffect, useState, useRef, useCallback } from "react";
import { useGreenApi } from "./GreenApi";
import { InstanceConfig } from "./InstanceConfig";

import axios from "axios";

type WithTimestamp<T> = T & { timestamp: number };

export enum NotificationType {
  outgoingAPIMessageReceived = "outgoingAPIMessageReceived",
  outgoingMessageReceived = "outgoingMessageReceived",
  incomingMessageReceived = "incomingMessageReceived",
}

export enum MessageType {
  extendedTextMessage = "extendedTextMessage",
  textMessage = "textMessage",
}

interface UseMessagesProps {
  receiveTimeout: number;
  interval: number;
  instanceConfig: InstanceConfig;
}

export interface Message {
  message: string;
  chatId: string;
}

export interface ChatMessage extends WithTimestamp<Message> {
  sender: SenderData;
  messageId: string;
}

export interface SenderData {
  chatId: string;
  chatName: string;
  sender: string;
  senderName: string;
  senderContactName: string;
}

interface MessageData {
  typeMessage: MessageType;
  extendedTextMessageData?: {
    text: string;
    description: string;
    title: string;
  };
  textMessageData?: {
    textMessage: string;
  };
}

interface Notification {
  receiptId: number;
  body: {
    typeWebhook: NotificationType;
    timestamp: number;
    idMessage: string;
    senderData: SenderData;
    messageData: MessageData;
  };
}

export function useMessages({
  receiveTimeout,
  instanceConfig,
  interval,
}: UseMessagesProps) {
  const {
    receiveNotification: receiveNotificationApiUrl,
    deleteNotification: deleteNotification,
    sendMessage: sendMessageApiUrl,
  } = useGreenApi(instanceConfig);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const getMessageText = (data: MessageData): string => {
    switch (data.typeMessage) {
      case MessageType.textMessage:
        return data.textMessageData?.textMessage || "";
      case MessageType.extendedTextMessage:
        return data.extendedTextMessageData?.text || "";
      default:
        return "Unsupported message";
    }
  };

  const notificationsHandler = useCallback(({ body }: Notification) => {
    switch (body.typeWebhook) {
      case NotificationType.incomingMessageReceived:
      case NotificationType.outgoingAPIMessageReceived:
      case NotificationType.outgoingMessageReceived: {
        const message: ChatMessage = {
          chatId: body.senderData.chatId,
          message: getMessageText(body.messageData),
          timestamp: body.timestamp,
          sender: body.senderData,
          messageId: body.idMessage,
        };

        setMessages((messages) => [...messages, message]);
        break;
      }

      default:
        break;
    }
  }, []);

  const receiveNotification = useCallback(async () => {
    return axios
      .get<Notification | null>(receiveNotificationApiUrl)
      .then(({ data }) => {
        if (!data) {
          return;
        }

        notificationsHandler(data);
        return axios.delete(deleteNotification(data.receiptId.toString()));
      });
  }, [receiveNotificationApiUrl, notificationsHandler, deleteNotification]);

  const sendMessage = useCallback(
    async (message: string) => {
      return axios.post<Message>(sendMessageApiUrl, {
        message,
        chatId: `${instanceConfig.recipient}@c.us`,
      });
    },
    [sendMessageApiUrl, instanceConfig.recipient]
  );

  useEffect(() => {
    intervalRef.current = setInterval(receiveNotification, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [receiveTimeout, receiveNotification, interval]);

  return {
    messages,
    sendMessage,
  };
}
