import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreadcrumbComponent } from '@breadcrumb/breadcrumb.component';
import { BD_FORMS_AND_VALIDATION } from '@breadcrumb/ListLinks';
import { User } from '@models/template/User';

export class Field {
  type: string;
  name: string;
  constructor(type: string | '', name?: string | '') {
    this.type = type;
    this.name = name;
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  field: Field;
  user: User;
  hide = true;

  constructor(public dialog: MatDialog) {
    this.field = new Field("text");
    this.user = new User("Andres", "Lopez", "andres@gmail.com", "5512345678", "HolaMundo");
    BreadcrumbComponent.update(BD_FORMS_AND_VALIDATION);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogForm, {
      width: '400px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("*************************************");
      console.log(result);
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogForm {

  constructor(
    public dialogRef: MatDialogRef<DialogForm>,
    @Inject(MAT_DIALOG_DATA) public data: User) {
    this.dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

}