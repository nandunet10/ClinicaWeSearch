import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css'],
  imports: [FormsModule],
  providers: [PacienteService]
})
export class CadastroPacienteComponent implements OnInit {
  paciente: Paciente = {
    nome: '',
    telefone: '',
    sexo: 'M',
    email: ''
  };
  isEdicao: boolean = false;

  constructor(
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isEdicao = this.route.snapshot.queryParams['isEdicao'] ?? false;
    const pacienteRouter: Paciente = {
      id: this.route.snapshot.queryParams['id'],
      nome: this.route.snapshot.queryParams['nome'] ?? '',
      telefone: this.route.snapshot.queryParams['telefone'] ?? '',
      sexo: this.route.snapshot.queryParams['sexo'] ?? 'M',
      email: this.route.snapshot.queryParams['email'] ?? ''
    }
    this.paciente = pacienteRouter;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.isEdicao ? this.editarPaciente() : this.cadastrarPaciente();
  }

  cadastrarPaciente() {
    this.pacienteService.cadastrarPaciente(this.paciente).subscribe(() => {
      Swal.fire({
        title: "Cadastro",
        text: "Realizado com sucesso!",
        icon: "success"
      });
      this.router.navigate(['/pacientes']);
      this.limparFormulario();
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

  editarPaciente() {
    this.pacienteService.editarPaciente(this.paciente.id!, this.paciente).subscribe(() => {
      Swal.fire({
        title: "Edição",
        text: "Realizado com sucesso!",
        icon: "success"
      });
      this.router.navigate(['/pacientes']);
      this.limparFormulario();
    },
      error => {
        Swal.fire({
          title: "Erro",
          text: "Erro ao editar paciente. Tente novamente.",
          icon: "error"
        });
        console.error('Erro ao cadastrar paciente:', error);
      }
    );
  }

  limparFormulario(): void {
    this.paciente = {
      nome: '',
      telefone: '',
      sexo: 'M',
      email: ''
    };
  }

  voltar() {
    window.history.back();
  }
}
