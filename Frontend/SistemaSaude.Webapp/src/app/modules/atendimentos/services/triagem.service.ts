import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Triagem } from '../models/triagem.model';

@Injectable({
  providedIn: 'root'
})
export class TriagemService {
  private apiUrl = 'https://localhost:44360/api/triagens'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) { }

  registrarTriagem(triagem: Triagem): Observable<any> {
    return this.http.post<Triagem>(this.apiUrl, triagem);
  }
}