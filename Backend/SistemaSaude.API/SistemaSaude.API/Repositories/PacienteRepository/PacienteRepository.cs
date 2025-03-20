using Microsoft.EntityFrameworkCore;
using SistemaSaude.API.Data;
using SistemaSaude.API.Models;

namespace SistemaSaude.API.Repositories.PacienteRepository
{
    public class PacienteRepository : IPacienteRepository
    {
        private readonly ApplicationDbContext _context;

        public PacienteRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Paciente>> GetPacientesAsync()
        {
            return await _context.Pacientes.ToListAsync();
        }

        public async Task<Paciente> GetPacienteByIdAsync(int id)
        {
            return await _context.Pacientes.FindAsync(id);
        }

        public async Task<Paciente> GetPacienteByEmailAsync(string email)
        {
            return await _context.Pacientes.FirstOrDefaultAsync(x => x.Email.Equals(email));

        }

        public async Task AddPacienteAsync(Paciente paciente)
        {
            _context.Pacientes.Add(paciente);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePacienteAsync(Paciente paciente)
        {
            _context.Entry(paciente).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeletePacienteAsync(int id)
        {
            var paciente = await _context.Pacientes.FindAsync(id);
            if (paciente != null)
            {
                _context.Pacientes.Remove(paciente);
                await _context.SaveChangesAsync();
            }
        }
    }
}
