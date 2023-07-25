using Domain.Models;
using FluentValidation;

namespace Domain.Validators
{
    public class HotelValidator : AbstractValidator<Hotel>
    {
        public HotelValidator()
        {
            RuleFor(hotel => hotel.Name).NotEmpty().MaximumLength(30);
            RuleFor(hotel => hotel.Address).NotEmpty();
            RuleFor(hotel => hotel.StarsRating).LessThan(6);
        }
    }
}
