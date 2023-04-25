using HRPlatformApi.Validations;
using System.ComponentModel.DataAnnotations;

namespace HRPlatformApi.Entities
{
    public class Skill
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="The field with Skill name {0} is required")]
        [StringLength(50)]
        [FirstLetterUpprecase] 
        public string SkillName { get; set; }








    }
}
