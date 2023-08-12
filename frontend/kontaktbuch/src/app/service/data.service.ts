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

  getOneContact(id:string): Observable<Contacts[]> {
      const contact = this.http.get<Contacts[]>(`http://localhost:5000/api/contact?=${id}`);
      return contact
  }

  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:5000/api/contact/${id}`,
      contact
    );
  }

  addNewContact(contact: Contacts[]): Observable<Contacts[]> {
    return this.http.post<Contacts[]>(
      `http://localhost:5000/api/contact`,
      contact
    );
  }

  removeContact(id: number): Observable<Contacts[]> {
    return this.http.delete<Contacts[]>(
      `http://localhost:5000/api/contact/${id}`
    );
  }
}
