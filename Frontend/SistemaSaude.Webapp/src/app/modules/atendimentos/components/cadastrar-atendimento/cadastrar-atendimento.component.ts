import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Paciente } from '../../../pacientes/models/paciente.model';
import { PacienteService } from '../../../pacientes/services/paciente.service';
import { Atendimento } from '../../models/atendimento.model';
import { AtendimentoService } from '../../services/atendimento.service';

@Component({
    selector: 'app-cadastrar-atendimento',
    templateUrl: './cadastrar-atendimento.component.html',
    styleUrls: ['./cadastrar-atendimento.component.css'],
    imports: [FormsModule, NgFor],
    providers:[PacienteService]
})
export class CadastrarAtendimentoComponent implements OnInit {
  atendimento: Atendimento = {
    numeroSequencial: '',
    pacienteId: 0,
    dataHoraChegada: new Date(),
    status: 'Triagem',
    paciente: null
  };
  pacientes: Paciente[] = [];

  constructor(
    private pacienteService: PacienteService,
    private atendimentoService: AtendimentoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.atendimento.pacienteId = this.route.snapshot.queryParams['pacienteId'];
  }

  ngOnInit() {
    this.obterPacientes();
  }

  obterPacientes(): void {
    this.pacienteService.listarPacientes().subscribe(response => {
      this.pacientes = response;
    })
  }

  onSubmit(): void {
    this.atendimentoService.cadastrarAtendimento(this.atendimento).subscribe(() => {
      Swal.fire({
        title: "Cadastro",
        text: "Realizado com sucesso!",
        icon: "success"
      });
      this.router.navigate(['/atendimentos']);
    },
      error => {
        Swal.fire({
          title: "Erro",
          text: "Erro ao cadastrar paciente. Tente novamente.",
          icon: "error"
        });
        console.error('Erro ao cadastrar paciente:', error);
      }
    );
  }

  voltar() {
    window.history.back();
  }

}
