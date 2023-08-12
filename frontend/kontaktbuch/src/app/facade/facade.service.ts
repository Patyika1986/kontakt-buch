import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Contacts } from '../interface/contact';
import { DataService } from '../service/data.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  private _contacts$ = new BehaviorSubject<Contacts[]>([]);
  public contacts$: Observable<Contacts[]> = this._contacts$.asObservable();

  private _updateContact$ = new BehaviorSubject<any>([]);
  public updateContact$: Observable<any> = this._updateContact$.asObservable();

  private _addNewContact$ = new BehaviorSubject<Contacts[]>([]);
  public addNewContact$: Observable<Contacts[]> =
    this._addNewContact$.asObservable();

    private _removeContact$ = new BehaviorSubject<Contacts[]>([]);
    public removeContact$: Observable<Contacts[]> =
      this._removeContact$.asObservable();
  
  constructor(private dataService: DataService) { }

  subscribtion$ = new Subject();

  loadAllContacts(): void {
    this.dataService
      .getAllContacts()
      .pipe(takeUntil(this.subscribtion$))
      .subscribe((employees: Contacts[]) => {
        this._contacts$.next(employees);
      });
  }


  updataContact(id: number, contact: any) {
    this.dataService
      .updateContact(id, contact)
      .pipe(takeUntil(this.subscribtion$))
      .subscribe((cont: any) => {
        this._updateContact$.next(cont);
      });
  }

  addContact(contact: Contacts[]) {
    this.dataService
      .addNewContact(contact)
      .pipe(takeUntil(this.subscribtion$))
      .subscribe((cont: Contacts[]) => {
        this._addNewContact$.next(cont);
      });
  }

  deleteContact(id: number): void {
    this.dataService
      .removeContact(id)
      .pipe(takeUntil(this.subscribtion$))
      .subscribe((user) => {
        this._removeContact$.next(user);
      });
  }
}
