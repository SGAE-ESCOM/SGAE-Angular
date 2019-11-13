import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@app/components/shared/breadcrumb/breadcrumb.component';
import { ListLinks } from '@app/components/shared/breadcrumb/ListLinks';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor() { 
    BreadcrumbComponent.update( ListLinks.MESSAGES, [ListLinks.HOME]);
  }

  showSuccess(){
    console.log("success message");
  }

  showMessage(message: string ){
    console.log("Messages: "+ message);
  }

  ngOnInit() {
  }

}
