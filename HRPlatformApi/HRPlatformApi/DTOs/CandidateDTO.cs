using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;

namespace HRPlatformApi.DTOs
{
    public class CandidateDTO
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public string Surname { get; set; }
      
        public int MobileNumber { get; set; }
        
        public string Email { get; set; }
       
        public DateTime Date { get; set; }

        public List<SkillDTO> Skills { get; set; }


    }
}
