import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atendimento } from '../models/atendimento.model';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
  private apiUrl = 'https://localhost:44360/api/atendimentos';

  constructor(private http: HttpClient) { }

  gerarFila(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  cadastrarAtendimento(atendimento: Atendimento): Observable<any> {
    return this.http.post<Atendimento>(this.apiUrl, atendimento);
  }

  chamarPaciente(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/chamarPaciente/${id}`, {});
  }

  deletarAtendimento(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}