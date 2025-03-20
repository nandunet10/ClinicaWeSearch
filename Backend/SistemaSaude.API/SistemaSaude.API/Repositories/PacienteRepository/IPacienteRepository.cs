using SistemaSaude.API.Models;

namespace SistemaSaude.API.Repositories.PacienteRepository
{
    public interface IPacienteRepository
    {
        Task<Paciente> GetPacienteByIdAsync(int id);
        Task<Paciente> GetPacienteByEmailAsync(string email);
        Task<IEnumerable<Paciente>> GetPacientesAsync();
        Task AddPacienteAsync(Paciente paciente);
        Task UpdatePacienteAsync(Paciente paciente);
        Task DeletePacienteAsync(int id);
    }
}
