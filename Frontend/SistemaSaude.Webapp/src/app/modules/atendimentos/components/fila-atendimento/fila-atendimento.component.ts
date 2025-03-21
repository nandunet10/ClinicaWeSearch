import { Component, OnInit } from '@angular/core';
import { AtendimentoService } from '../../services/atendimento.service';
import { Router } from '@angular/router';
import { Atendimento } from '../../models/atendimento.model';
import Swal from 'sweetalert2';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-fila-atendimento',
    templateUrl: './fila-atendimento.component.html',
    styleUrls: ['./fila-atendimento.component.css'],
    imports: [NgIf, NgFor]
})
export class FilaAtendimentoComponent implements OnInit {
  atendimentos: Atendimento[] = [];

  constructor(
    private atendimentoService: AtendimentoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarFila();
  }

  carregarFila() {
    this.atendimentoService.gerarFila().subscribe(response => {
      this.atendimentos = response;
    });
  }

  cadastrarAtendimento() {
    this.router.navigate(['/cadastro-atendimento']);
  }

  chamarPaciente(id: number) {
    this.router.navigate(['/triagem'], { queryParams: { 'atendimentoId': id } });
  }

  cancelarAtendimento(id: number) {
    Swal.fire({
      title: 'Cancelar atendimento',
      text: 'Tem certeza que deseja cancelar o registro? Uma vez cancelado não terá como recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.atendimentoService.deletarAtendimento(id).subscribe(() => {
          this.carregarFila()
        },
          () => {
            Swal.fire({
              title: 'Erro',
              text: 'Erro ao cancelar atendimento',
              icon: 'error',
            })
            this.carregarFila();
          }
        )
      }
    });
  }

  public voltar(): void {
    window.history.back();
  }
}
