using Core.Exceptions;
using Core.Interfaces;
using dddSample.Validators;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dddSample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly ICountriesRepository _countriesRepository;

        public CountriesController(ICountriesRepository countriesRepository)
        {
            _countriesRepository = countriesRepository;
        }

        // GET: api/Countries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetCountries()
        {
            var countries = await _countriesRepository.GetAllAsync();
            return countries == null ? throw new BadRequestException("Countries failed to load.") : Ok(countries);
        }

        // GET: api/Countries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetCountry([FromRoute] int id)
        {
            var country = await _countriesRepository.GetAsync(id);
            return country == null ? throw new NotFoundException("Country not found.", id) : Ok(country);
        }

        // PUT: api/Countries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCountry([FromRoute] int id, [FromBody] Country country)
        {
            if (id != country.Id)
                return BadRequest(new BadRequestException("Country ID missmatch"));

            var valRes = new CountryValidator().Validate(country);
            if (!valRes.IsValid)
                return BadRequest(valRes.Errors.Select(x => x.ErrorMessage).ToList());

            try
            {
                await _countriesRepository.UpdateAsync(country);
                return Ok(country);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _countriesRepository.Exists(id))
                    throw new NotFoundException("Country not found.", id);
            }

            return NoContent();
        }

        // POST: api/Countries/
        [HttpPost]
        public async Task<IActionResult> PostCountry([FromBody] Country country)
        {
            var valRes = new CountryValidator().Validate(country);
            if (!valRes.IsValid)
                return BadRequest(valRes.Errors.Select(x => x.ErrorMessage).ToList());

            var result = await _countriesRepository.AddAsync(country);
            return CreatedAtAction(nameof(GetCountry), new { id = result.Id }, result);
        }

        // DELETE: api/Countries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry([FromRoute] int id)
        {
            await _countriesRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
