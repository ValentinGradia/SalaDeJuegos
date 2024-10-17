import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPregunta } from '../interfaces/IPregunta';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private api : string = "https://api.quiz-contest.xyz/questions?limit=10&page=1&category=geography";


  constructor(private http: HttpClient  ) { }

  getData(): Observable<any>
  {
    const headers = new HttpHeaders({
      'Authorization': ' $2b$12$dqIr9yPpGJs5yg4aBem5ie78LARr4n.TeHhDO.bAxvCY.PETzJ8Lq'
    })

    //si o si headers
    return this.http.get<IPregunta>(this.api,{headers});
  }
}
