import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/';


  constructor( private http: HttpClient) { }




  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'users');
  }
}
