import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TttRequestServiceService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getMove<T>(requestObj: any): Observable<T> {
    return this.http.get<T>(`http://localhost:5000/move?game=${JSON.stringify(requestObj)}`);
  }

  public getAllGames<T>(): Observable<T[]> {
    return this.http.get<T[]>('http://localhost:3000/games');
  }

  public postGame<T>(requestObj: any): Observable<T> {
    return this.http.post<T>('http://localhost:3000/games', requestObj);
  }

}
