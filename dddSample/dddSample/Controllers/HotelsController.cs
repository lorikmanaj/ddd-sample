using Core.Exceptions;
using Core.Interfaces;
using Domain.Models;
using Domain.Validators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dddSample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly IHotelsRepository _hotelsRepository;

        public HotelsController(IHotelsRepository hotelsRepository)
        {
            _hotelsRepository = hotelsRepository;
        }

        // GET: api/Hotels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHotels()
        {
            var hotels = await _hotelsRepository.GetAllAsync();
            return hotels == null ? throw new BadRequestException("Hotels failed to load.") : Ok(hotels);
        }

        // GET: api/Hotels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetHotel([FromRoute] int id)
        {
            var hotel = await _hotelsRepository.GetAsync(id);
            return hotel == null ? throw new NotFoundException("Hotel not found.", id) : Ok(hotel);
        }

        // PUT: api/Hotels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHotel([FromRoute] int id, [FromBody] Hotel hotel)
        {
            if (id != hotel.Id)
                return BadRequest(new BadRequestException("Hotel ID missmatch"));

            var valRes = new HotelValidator().Validate(hotel);
            if (!valRes.IsValid)
                return BadRequest(valRes.Errors.Select(x => x.ErrorMessage).ToList());

            try
            {
                await _hotelsRepository.UpdateAsync(hotel);
                return Ok(hotel);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _hotelsRepository.Exists(id))
                    throw new NotFoundException("Hotel not found.", id);
            }

            return NoContent();
        }

        // POST: api/Hotels/
        [HttpPost]
        public async Task<IActionResult> PostHotel([FromBody] Hotel hotel)
        {
            var valRes = new HotelValidator().Validate(hotel);
            if (!valRes.IsValid)
                return BadRequest(valRes.Errors.Select(x => x.ErrorMessage).ToList());
            
            var result = await _hotelsRepository.AddAsync(hotel);
            return CreatedAtAction(nameof(GetHotel), new { id = result.Id }, result);
        }

        // DELETE: api/Hotels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotel([FromRoute] int id)
        {
            await _hotelsRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
