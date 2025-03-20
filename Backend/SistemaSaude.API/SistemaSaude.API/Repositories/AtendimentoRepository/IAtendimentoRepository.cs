using SistemaSaude.API.Models;

namespace SistemaSaude.API.Repositories.AtendimentoRepository
{
    public interface IAtendimentoRepository
    {
        Task<Atendimento> GetAtendimentoByIdAsync(int id);
        Task<IEnumerable<Atendimento>> GetAtendimentosAsync();
        Task AddAtendimentoAsync(Atendimento atendimento);
        Task UpdateAtendimentoAsync(Atendimento atendimento);
        Task UpdateStatuAtendimentoAsync(int id);
        Task DeleteAtendimentoAsync(int id);
    }
}
