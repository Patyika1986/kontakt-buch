import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contacts } from '../interface/contact';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<Contacts[]> {
    const data = this.http.get<Contacts[]>('http://localhost:5000/api/contact');
    return data;
  }
}
