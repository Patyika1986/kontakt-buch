import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FacadeService } from 'src/app/facade/facade.service';
import { Contacts } from 'src/app/interface/contact';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  constructor(
    private formbuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    private dataService: DataService
  ) {}

  public form = this.formbuilder.group({
    firstname: [
      '',
      Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(35),
        Validators.required,
      ]),
    ],
    lastname: [
      '',
      Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(35),
        Validators.required,
      ]),
    ],
    gender: [
      '',
      Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(35),
        Validators.required,
      ]),
    ],
    email: [
      '',
      Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(35),
        Validators.required,
        Validators.email,
      ]),
    ],
    tel: [
      '',
      Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(35),
        Validators.required,
      ]),
    ],
    id: [''],
  });

  subscribtion$ = new Subject();
  id!: string;
  newContact:Contacts[] = [];

  ngOnInit(): void {
    const isId = this.activatedRoute.snapshot.paramMap.get('id');

    if (isId) {
      this.id = isId;
      this.form.controls.id.setValue(this.id);
      this.dataService.getOneContact(this.id).subscribe((contact) => {
        const result = contact.find((con) => con.id === Number(this.id));
        if (result) {
          this.form.controls.firstname.setValue(result.firstname);
          this.form.controls.lastname.setValue(result.lastname);
          this.form.controls.gender.setValue(result.gender);
          this.form.controls.email.setValue(result.email);
          this.form.controls.tel.setValue(result.tel);
        }
      });
    } else {
      console.log(' id dont exist !');
    }
  }

  sendForm(form: any) {
    if (form.value.id === this.id && form.status === 'VALID') {
      this.facadeService.updataContact(Number(this.id), form.value);
      this.facadeService.updateContact$
        .pipe(takeUntil(this.subscribtion$))
        .subscribe();
    }else if(form.status === "VALID"){
      this.addContact(form.value);
    }
  }

  addContact(contact:any){
    const min = 0;
    const max = 10000;
    if(this.form.status === "VALID"){
      const randomId = Math.floor(Math.random() * (max - min) + min);
      this.form.value.id = randomId.toString();
      this.newContact.push(contact)
      this.facadeService.addContact(this.newContact);
      this.facadeService.addNewContact$.pipe(takeUntil(this.subscribtion$)).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.subscribtion$.next(false);
    this.subscribtion$.complete();
  }
}
