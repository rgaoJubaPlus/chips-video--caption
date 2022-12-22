import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpsService {
  private generateURL = 'http://localhost:8000/static_insertion';
  constructor(private http: HttpClient) {}
  generateVideo(body: any) {
    return this.http.post<any>(this.generateURL, body, httpOptions);
  }
}
