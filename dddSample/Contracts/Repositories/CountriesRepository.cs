using Core.Exceptions;
using Core.GenericRepository;
using Core.Interfaces;
using Domain.Models;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public class CountriesRepository : GenericRepository<Country>, ICountriesRepository
    {
        public CountriesRepository(HotelsDB context) : base(context)
        {

        }
    }
}
