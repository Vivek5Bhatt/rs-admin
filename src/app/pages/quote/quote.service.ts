import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient) { }

  getAllQuotes() {
    const url = `${environment.apiUrl}quotes/list`;
    return this.http.get(url);
  }

  changeStatus(statusData: any) {
    const url = `${environment.apiUrl}quotes/status`;
    return this.http.put(url, statusData);
  }

}
