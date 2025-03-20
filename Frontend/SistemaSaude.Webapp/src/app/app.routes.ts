import { Routes } from '@angular/router';
import { CadastroPacienteComponent } from './modules/pacientes/components/cadastro-paciente/cadastro-paciente.component';
import { ListaPacientesComponent } from './modules/pacientes/components/lista-pacientes/lista-pacientes.component';
import { FilaAtendimentoComponent } from './modules/atendimentos/components/fila-atendimento/fila-atendimento.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { CadastrarAtendimentoComponent } from './modules/atendimentos/components/cadastrar-atendimento/cadastrar-atendimento.component';
import { TriagemComponent } from './modules/atendimentos/components/triagem/triagem.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } },
  { path: 'atendimentos', component: FilaAtendimentoComponent, data: { breadcrumb: 'Atendimentos' } },
  { path: 'cadastro-atendimento', component: CadastrarAtendimentoComponent, data: { breadcrumb: 'Cadastro de Atendimento' } },
  { path: 'triagem', component: TriagemComponent, data: { breadcrumb: 'Triagem' } },
  { path: 'pacientes', component: ListaPacientesComponent, data: { breadcrumb: 'Pacientes' } },
  { path: 'cadastro-paciente', component: CadastroPacienteComponent, data: { breadcrumb: 'Cadastro de Paciente' } },
];
