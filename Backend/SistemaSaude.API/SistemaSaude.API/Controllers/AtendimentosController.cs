using Microsoft.AspNetCore.Mvc;
using SistemaSaude.API.Models;
using SistemaSaude.API.Repositories.AtendimentoRepository;

namespace SistemaSaude.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtendimentosController(IAtendimentoRepository atendimentoRepository) : ControllerBase
    {
        private readonly IAtendimentoRepository _atendimentoRepository = atendimentoRepository;

        [HttpPost]
        public async Task<IActionResult> CreateAtendimento(Atendimento atendimento)
        {
            await _atendimentoRepository.AddAtendimentoAsync(atendimento);
            return CreatedAtAction("GetAtendimento", new { id = atendimento.Id }, atendimento);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Atendimento>>> GetAtendimentos()
        {
            var atendimentos = await _atendimentoRepository.GetAtendimentosAsync();
            return Ok(atendimentos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Atendimento>> GetAtendimento(int id)
        {
            var atendimento = await _atendimentoRepository.GetAtendimentoByIdAsync(id);
            if (atendimento == null)
            {
                return NotFound();
            }

            return Ok(atendimento);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAtendimento(int id, Atendimento atendimento)
        {
            if (id != atendimento.Id) return BadRequest();

            await _atendimentoRepository.UpdateAtendimentoAsync(atendimento);
            return NoContent();
        }

        [HttpPut("chamarPaciente/{id}")]
        public async Task<IActionResult> UpdateAtendimento(int id)
        {
            if (id == 0) return BadRequest();

            await _atendimentoRepository.UpdateStatuAtendimentoAsync(id);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAtendimento(int id)
        {
            await _atendimentoRepository.DeleteAtendimentoAsync(id);
            return NoContent();
        }
    }
}
