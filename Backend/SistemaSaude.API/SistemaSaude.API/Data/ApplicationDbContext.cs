using Microsoft.EntityFrameworkCore;
using SistemaSaude.API.Models;

namespace SistemaSaude.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<Atendimento> Atendimentos { get; set; }
        public DbSet<Triagem> Triagens { get; set; }
    }
}
