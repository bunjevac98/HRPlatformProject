using Microsoft.AspNetCore.Mvc.DataAnnotations;
using System.ComponentModel.DataAnnotations;

namespace HRPlatformApi.Validations
{
    public class FirstLetterUpprecaseAttribute:ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null || string.IsNullOrEmpty(value.ToString())) {
                return ValidationResult.Success;
            }
            var firestLetter = value.ToString()[0].ToString();
            if (firestLetter != firestLetter.ToUpper()) {
                return new ValidationResult("First Letter should be upprecase");
            }
            return ValidationResult.Success;
        }






    }
}
