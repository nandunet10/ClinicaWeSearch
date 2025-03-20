using Microsoft.EntityFrameworkCore;
using SistemaSaude.API.Data;
using SistemaSaude.API.Models;

namespace SistemaSaude.API.Repositories.TriagemRepository
{
    public class TriagemRepository(ApplicationDbContext context) : ITriagemRepository
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<IEnumerable<Triagem>> GetTriagensAsync()
        {
            return await _context.Triagens.Include(t => t.Atendimento).ToListAsync();
        }

        public async Task<Triagem> GetTriagemByIdAsync(int id)
        {
            return await _context.Triagens.Include(t => t.Atendimento).FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task AddTriagemAsync(Triagem triagem)
        {
            _context.Triagens.Add(triagem);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTriagemAsync(Triagem triagem)
        {
            _context.Entry(triagem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTriagemAsync(int id)
        {
            var triagem = await _context.Triagens.FindAsync(id);
            if (triagem != null)
            {
                _context.Triagens.Remove(triagem);
                await _context.SaveChangesAsync();
            }
        }
    }
}
