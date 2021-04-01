export class NotificationMessage {
  message: string;
  type: NotificationType;

  constructor(message: string, type: NotificationType) {
    this.message = message;
    this.type = type;
  }

}

export enum NotificationType {
  success = 0,
  info = 1,
  error = 2
}
