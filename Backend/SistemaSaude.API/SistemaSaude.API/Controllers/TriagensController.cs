using Microsoft.AspNetCore.Mvc;
using SistemaSaude.API.Models;
using SistemaSaude.API.Repositories.TriagemRepository;

namespace SistemaSaude.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TriagensController(ITriagemRepository triagemRepository) : ControllerBase
    {
        private readonly ITriagemRepository _triagemRepository = triagemRepository;

        [HttpPost]
        public async Task<IActionResult> CreateTriagem(Triagem triagem)
        {
            await _triagemRepository.AddTriagemAsync(triagem);
            return CreatedAtAction("GetTriagem", new { id = triagem.Id }, triagem);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Triagem>>> GetTriagens()
        {
            var triagens = await _triagemRepository.GetTriagensAsync();
            return Ok(triagens);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Triagem>> GetTriagem(int id)
        {
            var triagem = await _triagemRepository.GetTriagemByIdAsync(id);
            if (triagem == null)
            {
                return NotFound();
            }
            return Ok(triagem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTriagem(int id, Triagem triagem)
        {
            if (id != triagem.Id)
            {
                return BadRequest();
            }
            await _triagemRepository.UpdateTriagemAsync(triagem);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTriagem(int id)
        {
            await _triagemRepository.DeleteTriagemAsync(id);
            return NoContent();
        }
    }
}
