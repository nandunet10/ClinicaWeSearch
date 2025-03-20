using SistemaSaude.API.Models;

namespace SistemaSaude.API.Repositories.TriagemRepository
{
    public interface ITriagemRepository
    {
        Task<Triagem> GetTriagemByIdAsync(int id);
        Task<IEnumerable<Triagem>> GetTriagensAsync();
        Task AddTriagemAsync(Triagem triagem);
        Task UpdateTriagemAsync(Triagem triagem);
        Task DeleteTriagemAsync(int id);
    }
}
