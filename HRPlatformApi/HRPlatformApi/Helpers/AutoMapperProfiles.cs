using AutoMapper;
using HRPlatformApi.DTOs;
using HRPlatformApi.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System.Collections.Generic;

namespace HRPlatformApi.Helpers
{
    public class AutoMapperProfiles:Profile
    {

        //Mapira sve iz SkillDTO(Baze) na Skill iz proj, i obrnuto
        public AutoMapperProfiles() { 
            CreateMap<SkillDTO, Skill>().ReverseMap();
            //za post posto ima samo skillName
            //mozda fali reverse map
            CreateMap<SkillCreationDTO, Skill>();


            CreateMap<CandidateCreationDTO, Candidate>()
                .ForMember(x => x.CandidateSkills, options => options.MapFrom(MapCandidateSkills));
            //CreateMap<CandidateCreationDTO, Candidate>().ReverseMap();

            //OVO MOZDA NE KONVERTUJE KAKO TREBA
            CreateMap<Candidate, CandidateDTO>()
                .ForMember(x => x.Skills, options => options.MapFrom(MapCandidateSkills));
                


        }
        private List<SkillDTO> MapCandidateSkills(Candidate candidate, CandidateDTO candidateDTO) { 
        
            var result= new List<SkillDTO>();

            if (candidate.CandidateSkills != null) {

                foreach (var skill in candidate.CandidateSkills)
                {
                    //ovde paziti jer je jedan od njih prazan A vrv je ovaj moj
                    result.Add(new SkillDTO() { Id = skill.SkillId, SkillName = skill.Skill.SkillName });
                }
            }

            return result;
        }






        private List<CandidateSkills> MapCandidateSkills(CandidateCreationDTO candidateCreationDTO, Candidate candidate) { 
        
            var result= new List<CandidateSkills>();

            if (candidateCreationDTO.SkillsIds==null)
            {
                return result;
            }

            foreach (var id in candidateCreationDTO.SkillsIds)
            {
                result.Add(new CandidateSkills()
                {
                    SkillId = id,
                });
            }

            return result;
        }

        







    }
}
