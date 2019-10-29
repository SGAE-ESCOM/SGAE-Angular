import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface TypeOfData {
  name: string;
  description: string;
  subdata : TypeOfData[];
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {

  constructor(){}

  typeOfInput: TypeOfData[] = [
    { name: "Text" , description: '', subdata: null},
    { name: "Number" , description: '', subdata: null},
    { name: "Phone" , description: '', subdata: null}
  ];

  typeOfSelect: TypeOfData[] = [
    { name: "One option" , description: '', subdata: null},
    { name: "Multiple option" , description: '', subdata: null},
  ];

  typeOfFile: TypeOfData[] = [
    { name: "Image" , description: '', subdata: null},
    { name: "PDF" , description: '', subdata: null},
  ];

  typeOfData: TypeOfData[] = [
    { name: 'Text', description: 'It\'s an Input', subdata : this.typeOfInput},
    { name: 'Options', description: 'It\'s a file' , subdata: this.typeOfSelect},
    { name: 'File', description: 'It\'s a file' , subdata: this.typeOfFile}
  ];

  //This formControl has a init value, "Text"
  typeOfDataControl = new FormControl(this.typeOfData[0], [Validators.required]);
  typeOfSubDataControl = new FormControl('', [Validators.required]);
}
