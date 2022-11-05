import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiDataService {

  constructor(private httpClient: HttpClient) { }

  getAggregatedData(time: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:5222/time-series/aggregatedData/${time}`);
  }
}
