using Core.GenericRepository;
using Core.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Core.Repositories
{
    public class HotelsRepository : GenericRepository<Hotel>, IHotelsRepository
    {
        private readonly HotelsDB _context;

        public HotelsRepository(HotelsDB context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Hotel>> GetCountryHotels(int id)
        {
            return await _context.Hotels.Where(h => h.CountryId == id).ToListAsync();
        }
    }
}