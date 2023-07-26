using Core.GenericRepository;
using Core.Interfaces;
using Domain.Models;
using Infrastructure.Data;

namespace Core.Repositories
{
    public class CountriesRepository : GenericRepository<Country>, ICountriesRepository
    {
        public CountriesRepository(HotelsDB context) : base(context)
        {

        }
    }
}