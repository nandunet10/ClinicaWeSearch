# ClinicaWeSearch

## Diagrama UML
```plantuml
@startuml
left to right direction
actor Recepcionista
actor Enfermeiro
actor Medico
actor Paciente

Recepcionista --> (Cadastrar Paciente)
Recepcionista --> (Gerar Número de Atendimento)
Enfermeiro --> (Realizar Triagem)
Medico --> (Chamar Paciente)
Medico --> (Realizar Atendimento)
@enduml
