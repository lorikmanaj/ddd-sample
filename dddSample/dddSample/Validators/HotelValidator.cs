using Domain.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
