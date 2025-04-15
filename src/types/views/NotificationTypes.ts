type NotificationItemType = {
  id: number;
  body: {
    icon?: string;
    title: string;
    message: string;
  };
  type: string;
  sent_to: string;
  send_time: string | Date;
}

export type { NotificationItemType }