import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  constructor(private formbuilder: FormBuilder){}

  public form = this.formbuilder.group({
    firstname:['',Validators.compose([Validators.minLength(3),Validators.maxLength(35),Validators.required])],
    lastname:['',Validators.compose([Validators.minLength(3),Validators.maxLength(35),Validators.required])],
    gender:['',Validators.compose([Validators.minLength(3),Validators.maxLength(35),Validators.required])],
    email:['',Validators.compose([Validators.minLength(3),Validators.maxLength(35),Validators.required,Validators.email])],
    tel:['',Validators.compose([Validators.minLength(3),Validators.maxLength(35),Validators.required])]
  });


  sendForm(form:FormBuilder | any){
    console.log(form.value);
    
  }

}
