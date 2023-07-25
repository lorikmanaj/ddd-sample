using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.GenericRepository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly HotelsDB _context;

        public GenericRepository(HotelsDB context)
        {
            _context = context;
        }

        public async Task<T> AddAsync(T entity)
        {
            await _context.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await GetAsync(id);

            if (entity is null)
                throw new NotFoundException(typeof(T).Name, id);

            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> Exists(int id)
        {
            var entity = await GetAsync(id);
            return entity != null;
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T> GetAsync(int? id)
        {
            var result = await _context.Set<T>().FindAsync(id);
            
            if (result is null)
                throw new NotFoundException(typeof(T).Name, id.HasValue ? id : "No Key Provided");

            return result;
        }

        public async Task UpdateAsync(T entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
