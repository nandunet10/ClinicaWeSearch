namespace SistemaSaude.API.Models
{
    public class Atendimento
    {
        public int Id { get; set; }
        public string NumeroSequencial { get; set; }
        public DateTime DataHoraChegada { get; set; }
        public string Status { get; set; }

        public int PacienteId { get; set; }
        public Paciente? Paciente { get; set; }
    }
}
