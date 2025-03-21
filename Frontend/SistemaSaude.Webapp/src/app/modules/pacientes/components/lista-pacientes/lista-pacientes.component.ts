import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/paciente.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'app-lista-pacientes',
    templateUrl: './lista-pacientes.component.html',
    styleUrls: ['./lista-pacientes.component.css'],
    imports: [NgIf, NgFor, NgClass]
})
export class ListaPacientesComponent implements OnInit {
  @ViewChild('meuInput') meuInput: ElementRef | undefined;

  pacientes: Paciente[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  habilitarInput: boolean = true;

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPacientes();
  }

  loadPacientes(): void {
    this.pacienteService.getPacientes(this.currentPage, this.itemsPerPage).subscribe((response: any) => {
      this.pacientes = response;
      this.totalItems = response.length;
    },
      (error) => {
        console.error('Erro ao carregar pacientes:', error);
      }
    );
  }

  consultarPaciente(email: string) {
    if (email != "") {

      this.pacienteService.getPacienteByEmail(email).subscribe(response => {
        if (response == null) {
          Swal.fire({
            title: 'Confirmar alterações',
            text: 'Paciente não existe! Deseja cadastrar o mesmo no sistema?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate([`/cadastro-paciente`], { queryParams: Object.assign({ email: email }) });
            }
          });
        } else {
          this.pacientes = [response];
          this.totalItems = 1;
          this.currentPage = 1;
        }
      },
        () => {
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao consultar paciente',
            icon: 'error',
          })
          this.loadPacientes();
        }
      );
    } else {
      this.loadPacientes();
    }
  }

  cadastrarPaciente() {
    this.router.navigate(['/cadastro-paciente']);
  }

  editarPaciente(paciente: Paciente) {
    this.router.navigate(['/cadastro-paciente'], {
      queryParams:
      {
        'id': paciente.id,
        'nome': paciente.nome,
        'telefone': paciente.telefone,
        'sexo': paciente.sexo,
        'email': paciente.email,
        'isEdicao': true
      }
    });
  }

  validarCampoConsulta(): boolean {
    return this.meuInput!.nativeElement.value.trim() === '';
  }

  marcarConsulta(paciente: Paciente) {
    // console.log(`Marcar consulta para o id: ${paciente.id}`);
    console.log(`Marcar consulta para o paciente: ${JSON.stringify(paciente)}`);
  }

  deletarPaciente(id: number) {
    Swal.fire({
      title: 'Deletar paciente',
      text: 'Tem certeza que deseja deletar o registro? Uma vez excluído não terá como recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.deletarPaciente(id).subscribe(() => {
          this.loadPacientes();
        },
          () => {
            Swal.fire({
              title: 'Erro',
              text: 'Erro ao deletar paciente',
              icon: 'error',
            })
            this.loadPacientes();
          }
        )
      }
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadPacientes();
  }

  get pages(): number[] {
    if (this.pacientes.length > 0) {
      const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
      return Array(pageCount).fill(0).map((_, index) => index + 1);
    }
    return Array(0).fill(0).map((_, index) => index + 1)
  }

  isLastPage(): boolean {
    return this.currentPage === this.pages.length;
  }

  voltar(): void {
    window.history.back();
  }
}
