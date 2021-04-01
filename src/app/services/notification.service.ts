import { NotificationMessage } from './../models/notification-message';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject: Subject<NotificationMessage> = new Subject<NotificationMessage>();

  constructor() { }

  sendNotification(message: NotificationMessage) {
    this.notificationSubject.next(message);
  }

  getNotification(): Observable<NotificationMessage> {
    return this.notificationSubject.asObservable();
  }
}
