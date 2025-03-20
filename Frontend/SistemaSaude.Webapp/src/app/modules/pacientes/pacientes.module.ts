import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroPacienteComponent } from './components/cadastro-paciente/cadastro-paciente.component';
import { FormsModule } from '@angular/forms';
import { PacienteService } from './services/paciente.service';
import { ListaPacientesComponent } from './components/lista-pacientes/lista-pacientes.component';

@NgModule({
  declarations: [
    CadastroPacienteComponent,
    ListaPacientesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    PacienteService
  ]
})
export class PacientesModule { }
