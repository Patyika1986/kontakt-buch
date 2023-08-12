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
}
