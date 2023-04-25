namespace HRPlatformApi.Entities
{
    public class CandidateSkills
    {
        public int SkillId { get; set; }

        public int CandidateId { get; set; }

        public Skill Skill { get; set; }
        public Candidate Candidate { get; set; }

    }
}
