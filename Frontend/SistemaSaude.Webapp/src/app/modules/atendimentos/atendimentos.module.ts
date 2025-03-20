import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentoService } from './services/atendimento.service';
import { FilaAtendimentoComponent } from './components/fila-atendimento/fila-atendimento.component';
import { CadastrarAtendimentoComponent } from './components/cadastrar-atendimento/cadastrar-atendimento.component';
import { FormsModule } from '@angular/forms';
import { TriagemComponent } from './components/triagem/triagem.component';
import { TriagemService } from './services/triagem.service';

@NgModule({
  declarations: [
    FilaAtendimentoComponent,
    CadastrarAtendimentoComponent,
    TriagemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    AtendimentoService,
    TriagemService
  ]

})
export class AtendimentosModule { }
