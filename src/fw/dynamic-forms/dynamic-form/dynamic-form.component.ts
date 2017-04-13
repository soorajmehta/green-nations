import { Component, OnInit,EventEmitter, Input,OnChanges,Output, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

import { FieldDefinition } from '../field-definition';

@Component({
  selector: 'fw-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() vm: any;
  @Input() vmDefinition: Array<FieldDefinition>;
  @Input() operation: string;
  @Input() errorMessage: string;
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  status: string;
  submitted = false;
  vmCopy: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location) { }



  clearForm(): void {
    let group = {};
    this.vmCopy = Object.assign({},this.vm);
    this.vmDefinition.forEach(field => {
      group[field.key] = field.required ? new FormControl(this.vmCopy[field.key],Validators.required)
                                        : new FormControl(this.vmCopy[field.key]);
    });

    this.form = new FormGroup(group);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['errorMessage'].currentValue && this.status === 'waiting'){
      this.status = "";
    }
  }

  ngOnInit() {
    this.clearForm();

    this.route.params.subscribe(params => {
      this.operation = params['operation'];
      this.clearForm();
    })
  }

  onBack(): void{
    this.errorMessage = null;
    this.location.back();
  }

  onCancel(): void {
    this.onBack();
  }

  onSave(): void {
    this.submitted = true;
    if(this.form.valid){
      this.status = 'waiting';
      this.update.emit(this.form.value);
    }
  }

  onEdit(): void {
    this.router.navigate(['../','edit'],{ relativeTo: this.route })
  }

  onCreate(): void{
    this.submitted = true;
    if(this.form.valid){
      this.status = 'waiting';
      this.create.emit(this.form.value);
    }
  }

}
