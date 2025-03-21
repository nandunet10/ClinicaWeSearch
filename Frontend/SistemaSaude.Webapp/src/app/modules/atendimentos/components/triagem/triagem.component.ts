import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Triagem } from '../../models/triagem.model';
import { AtendimentoService } from '../../services/atendimento.service';
import { TriagemService } from '../../services/triagem.service';

@Component({
  selector: 'app-triagem',
  templateUrl: './triagem.component.html',
  styleUrls: ['./triagem.component.css'],
  imports: [FormsModule],
  providers: [TriagemService, AtendimentoService]
})
export class TriagemComponent {
  triagem: Triagem = {
    atendimentoId: 0,
    sintomas: '',
    pressaoArterial: '',
    peso: 0,
    altura: 0,
    especialidadeId: 0
  };

  constructor(
    private triagemService: TriagemService,
    private atendimentoService: AtendimentoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.triagem.atendimentoId = this.route.snapshot.queryParams['atendimentoId'];
  }

  registrar() {
    this.triagemService.registrarTriagem(this.triagem).subscribe(response => {
      this.triagem = response;
      this.atendimentoService.chamarPaciente(this.triagem.atendimentoId).subscribe(() => {
        Swal.fire({
          title: "Cadastro",
          text: "Realizado com sucesso!",
          icon: "success"
        });
        this.router.navigate(['/atendimentos']);
      });
    });
  }

  public voltar(): void {
    window.history.back();
  }
}