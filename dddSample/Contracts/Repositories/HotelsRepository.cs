using Core.GenericRepository;
using Core.Interfaces;
using Domain.Models;
using Infrastructure.Data;

namespace Core.Repositories
{
    public class HotelsRepository : GenericRepository<Hotel>, IHotelsRepository
    {
        public HotelsRepository(HotelsDB context) : base(context)
        {

        }
    }
}