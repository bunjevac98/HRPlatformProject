using System.Collections.Generic;

namespace HRPlatformApi.DTOs
{
    public class CandidatePutGetDTO
    {
        public CandidateDTO Candidate { get; set; }

        public List<SkillDTO> SelectedSkills { get; set; }
        public List<SkillDTO> NonSelectedSkills { get; set; }









    }
}
