import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ALPHANUMERICO_CON_ESPACIOS } from '@shared/utils/validators/regex';


@Component({
  selector: 'app-form-grupos',
  templateUrl: './form-grupos.component.html',
  styleUrls: ['./form-grupos.component.scss']
})
export class FormGruposComponent implements OnInit {

  @Input() isAgregar: boolean = true;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();

  fgGrupo: FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.fgGrupo = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(ALPHANUMERICO_CON_ESPACIOS)]]
    });
  }

  cerrarModal(){
    this.cerrar.emit(true);
  }
}
