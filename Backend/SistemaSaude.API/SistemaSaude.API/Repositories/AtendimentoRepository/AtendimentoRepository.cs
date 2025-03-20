using Microsoft.EntityFrameworkCore;
using SistemaSaude.API.Data;
using SistemaSaude.API.Models;

namespace SistemaSaude.API.Repositories.AtendimentoRepository
{
    public class AtendimentoRepository(ApplicationDbContext context) : IAtendimentoRepository
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<IEnumerable<Atendimento>> GetAtendimentosAsync()
        {
            return await _context.Atendimentos.Include(a => a.Paciente).ToListAsync();
        }

        public async Task<Atendimento> GetAtendimentoByIdAsync(int id)
        {
            return await _context.Atendimentos.Include(a => a.Paciente).FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task AddAtendimentoAsync(Atendimento atendimento)
        {
            GerarNumero(atendimento);
            _context.Atendimentos.Add(atendimento);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAtendimentoAsync(Atendimento atendimento)
        {
            _context.Entry(atendimento).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateStatuAtendimentoAsync(int id)
        {
            var atendimento = await GetAtendimentoByIdAsync(id);
            atendimento.Status = "Em atendimento";

            _context.Entry(atendimento).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAtendimentoAsync(int id)
        {
            var atendimento = await _context.Atendimentos.FindAsync(id);
            if (atendimento != null)
            {
                _context.Atendimentos.Remove(atendimento);
                await _context.SaveChangesAsync();
            }
        }

        private void GerarNumero(Atendimento atendimento)
        {
            DateTime dataHoje = DateTime.Today.Date;
            int contador = _context.Atendimentos.Any(x => x.DataHoraChegada.Date == dataHoje)
                    ? _context.Atendimentos.Where(x => x.DataHoraChegada.Date == dataHoje).Max(e => Convert.ToInt32(e.NumeroSequencial.Substring(8, 4)))
                    : 0;

            int numeroSequencial = contador + 1;
            string numeroFormatado = string.Concat(numeroSequencial.ToString("D4"));

            string dataHoraChegada = atendimento.DataHoraChegada.ToString("ddMMyy");

            string codigoUnico = $"D{dataHoraChegada}C{numeroFormatado}";

            atendimento.NumeroSequencial = codigoUnico;
        }


    }
}
