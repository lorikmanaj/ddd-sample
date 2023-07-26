using Domain.Models;
using FluentValidation;

namespace dddSample.Validators
{
    public class CountryValidator : AbstractValidator<Country>
    {
        public CountryValidator()
        {
            RuleFor(country => country.Name).NotEmpty().MinimumLength(4).MaximumLength(30);
            RuleFor(country => country.ShortName).NotEmpty().MinimumLength(2).MaximumLength(4);
        }
    }
}
