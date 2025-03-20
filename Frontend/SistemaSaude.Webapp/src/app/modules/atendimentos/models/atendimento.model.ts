import { Paciente } from "../../pacientes/models/paciente.model";

export interface Atendimento {
    id?: number,
    numeroSequencial: string,
    pacienteId: number,
    dataHoraChegada: Date,
    status: string,
    paciente: Paciente | null
}