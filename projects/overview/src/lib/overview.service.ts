import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(private httpClient: HttpClient) { }

  getMonthlyData(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:5222/time-series');
  }
}
