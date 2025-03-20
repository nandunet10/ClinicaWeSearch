import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../../../modules/pacientes/models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'https://localhost:44360/api/pacientes'; // Altere para a URL da sua API

  constructor(private http: HttpClient) { }

  cadastrarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }

  editarPaciente(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente);
  }

  listarPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  getPacientes(page: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get(this.apiUrl, { params });
  }

  getPacienteByEmail(email: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/email/${email}`);
  }

  deletarPaciente(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

}
