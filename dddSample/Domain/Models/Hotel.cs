using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal StarsRating { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }

        [ForeignKey(nameof(CountryId))]
        public int CountryId { get; set; }
        public Country Country { get; set; }
    }
}
