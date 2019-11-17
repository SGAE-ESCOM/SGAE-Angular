import { Component, OnInit, Inject } from '@angular/core';
import { Message } from '@app/models/template/Message';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-messages-snack',
  templateUrl: './messages-snack.component.html',
  styleUrls: ['./messages-snack.component.scss']
})
export class MessagesSnackComponent implements OnInit {

  message: Message;

  constructor(
    public snackBarRef: MatSnackBarRef<MessagesSnackComponent>, 
    @Inject(MAT_SNACK_BAR_DATA) public data: any 
  ) { 
    this.message = data;
  }

  ngOnInit() {
  }

  setMessage(message: Message) {
    this.message = message;
  }

}
