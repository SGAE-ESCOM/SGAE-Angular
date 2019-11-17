import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackComponent } from '@app/components/shared/messages-snack/messages-snack.component'
import { Message } from '@app/models/template/Message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  message: Message;

  constructor(private _message: MatSnackBar) { }

  showMessage(message: string, style: string, title?: string, icon?: string, config?:any) {
    this.message = new Message(message, title, style, icon);
    if (!config) {
      this._message.openFromComponent(MessagesSnackComponent, {
        data: this.message,
        duration: 3 * 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: style
      });
    }else{
      this._message.openFromComponent(MessagesSnackComponent, config);
    }
  }

  success(message: string, title?: string, config?: any) {
    this.showMessage( message, 'success', title, 'done', config);
  }

  info(message: string, title?: string, config?: any) {
    this.showMessage( message, 'info', title, 'info', config);
  }

  warning(message: string, title?: string, config?: any) {
    this.showMessage( message, 'warning', title, 'warning', config);
  }

  danger(message: string, title?: string, config?: any) {
    this.showMessage( message, 'danger', title, 'error', config);
  }

}
