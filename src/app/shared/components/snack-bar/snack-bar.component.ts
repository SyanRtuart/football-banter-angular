import { NotificationMessage, NotificationType } from './../../../models/notification-message';
import { NotificationService } from './../../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  messages: NotificationMessage[] = [];
  subscription: Subscription;

  constructor(private _snackBar: MatSnackBar, private notificationService: NotificationService) {
    this.subscription = this.notificationService.getNotification().subscribe(notification => {
      if (notification) {
        this.openSnackBar(notification.message, notification.type)
      } else {
        this.messages = [];
      }
    });
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, notificationType: NotificationType) {
    let panelClass: string[] = [];
    panelClass.push('mat-toolbar');
    panelClass.push('snackbar-button');

    switch (notificationType) {
      case NotificationType.success:
        panelClass.push('mat-primary');
        break;
      case NotificationType.error:
        panelClass.push('mat-warn');
        break;
      case NotificationType.info:
        // standard panel
        break;
      default:
        break;
    }

    this._snackBar.open(message, "Dismiss", {
      duration: this.durationInSeconds * 1000,
      panelClass: panelClass
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

