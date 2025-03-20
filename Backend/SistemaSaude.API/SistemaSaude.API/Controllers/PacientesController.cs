using Microsoft.AspNetCore.Mvc;
using SistemaSaude.API.Models;
using SistemaSaude.API.Repositories.PacienteRepository;

namespace SistemaSaude.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacientesController(IPacienteRepository pacienteRepository) : ControllerBase
    {
        private readonly IPacienteRepository _pacienteRepository = pacienteRepository;

        [HttpPost]
        public async Task<IActionResult> CreatePaciente(Paciente paciente)
        {
            await _pacienteRepository.AddPacienteAsync(paciente);
            return CreatedAtAction("GetPaciente", new { id = paciente.Id }, paciente);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Paciente>>> GetPacientes()
        {
            var pacientes = await _pacienteRepository.GetPacientesAsync();
            return Ok(pacientes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Paciente>> GetPaciente(int id)
        {
            var paciente = await _pacienteRepository.GetPacienteByIdAsync(id);
            if (paciente == null)
            {
                return NotFound();
            }

            return Ok(paciente);
        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult<Paciente>> GetPacienteByEmail(string email)
        {
            string decodedEmail = email.Contains("%40") ? Uri.UnescapeDataString(email) : email;
            var paciente = await _pacienteRepository.GetPacienteByEmailAsync(decodedEmail);

            return Ok(paciente);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePaciente(int id, Paciente paciente)
        {
            if (id != paciente.Id)
            {
                return BadRequest();
            }

            await _pacienteRepository.UpdatePacienteAsync(paciente);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaciente(int id)
        {
            await _pacienteRepository.DeletePacienteAsync(id);
            return NoContent();
        }
    }
}
