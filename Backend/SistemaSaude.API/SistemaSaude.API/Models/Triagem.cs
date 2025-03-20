namespace SistemaSaude.API.Models
{
    public class Triagem
    {
        public int Id { get; set; }
        public string Sintomas { get; set; }
        public string PressaoArterial { get; set; }
        public decimal Peso { get; set; }
        public decimal Altura { get; set; }
        public int EspecialidadeId { get; set; }

        public int AtendimentoId { get; set; }
        public Atendimento? Atendimento { get; set; }
    }
}
