using Core.GenericRepository;
using Domain.Models;

namespace Core.Interfaces
{
    public interface IHotelsRepository : IGenericRepository<Hotel>
    {
        Task<List<Hotel>> GetCountryHotels(int id);
    }
}