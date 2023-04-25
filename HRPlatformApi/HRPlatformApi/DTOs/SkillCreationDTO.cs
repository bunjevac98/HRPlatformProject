using HRPlatformApi.Validations;
using System.ComponentModel.DataAnnotations;

namespace HRPlatformApi.DTOs
{
    public class SkillCreationDTO
    {

        [Required(ErrorMessage = "The field with Skill name {0} is required")]
        [StringLength(50)]
        [FirstLetterUpprecase]
        public string SkillName { get; set; }



    }
}
