using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HRPlatformApi.Entities
{
    public class Candidate
    {

        public int Id { get; set; }
        
        public string Name { get; set; }
       
        public string Surname { get; set; }
        
        public int MobileNumber { get; set; }
        
        public string Email { get; set; }
        
        public DateTime Date { get; set; }

        public List<CandidateSkills> CandidateSkills { get; set; }


    }
}
