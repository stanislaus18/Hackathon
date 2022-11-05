import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  getMonthlyData() {
      this.httpClient.get('http://localhost:5222/time-series');
  }
}
