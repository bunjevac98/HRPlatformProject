using AutoMapper;
using HRPlatformApi.DTOs;
using HRPlatformApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRPlatformApi.Controllers
{

    [Route("api/candidate")]
    public class CandidateController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public CandidateController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<CandidatePostGetDTO>> PostGet() {

            var skills = await context.Skills.ToListAsync();

            var skillsDTO = mapper.Map<List<SkillDTO>>(skills);

            return new CandidatePostGetDTO() { Skills = skillsDTO };

        }





        [HttpPost("Create")]
        public async Task<ActionResult> Post([FromBody]CandidateCreationDTO candidateCreationDTO) {

            var candidate = mapper.Map<Candidate>(candidateCreationDTO);

            context.Add(candidate);
            await context.SaveChangesAsync();
            return NoContent();
        }



        [HttpGet]
        public async Task<ActionResult<LandingPageDTO>> Get() {


            var listOfCandidates = await context.Candidates
                .Include(x => x.CandidateSkills).ThenInclude(x => x.Skill)
                .ToListAsync();

            var landingPage= new LandingPageDTO();

            landingPage.ListOfCandidates= mapper.Map<List<CandidateDTO>>(listOfCandidates);

            return landingPage;


        }



        [HttpGet("{id:int}")]
        public async Task<ActionResult<CandidateDTO>> Get(int id) {

            var candidate = await context.Candidates
                .Include(x => x.CandidateSkills).ThenInclude(x => x.Skill)
                .FirstOrDefaultAsync(x => x.Id == id);
                
                if(candidate == null) {
                return NotFound();
               }

                var dto = mapper.Map<CandidateDTO>(candidate);
            return dto;
        
        }

        [HttpGet("PutGet/{id:int}")]
        public async Task<ActionResult<CandidatePutGetDTO>> PutGet(int id) { 
        
            var candidateActionResult = await Get(id);
            if (candidateActionResult.Result is NotFoundResult) 
            {
                return NotFound();
            }

            var candidate = candidateActionResult.Value;

            var skillsSelectedIds=candidate.Skills.Select(x => x.Id).ToList();
            var nonSelectedSkills = await context.Skills.Where(x => !skillsSelectedIds.Contains(x.Id))
                .ToListAsync();

            var nonSelectedSkillsDTOs = mapper.Map<List<SkillDTO>>(nonSelectedSkills);


            var response = new CandidatePutGetDTO();
            response.Candidate = candidate;
            response.SelectedSkills = candidate.Skills;
            response.NonSelectedSkills = nonSelectedSkillsDTOs;

            return response;

        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] CandidateCreationDTO candidateCreationDTO) { 
            
            var candidate=await context.Candidates.Include(x=>x.CandidateSkills)
                .FirstOrDefaultAsync(x=>x.Id==id);

            if (candidate==null)
            {
                return NotFound();
            }
            candidate = mapper.Map(candidateCreationDTO, candidate);

            await context.SaveChangesAsync();

            return NoContent();
        
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id) {

            var candidate = await context.Candidates.FirstOrDefaultAsync(x => x.Id == id);

            if (candidate == null) { 
                return NotFound();
            }
            context.Remove(candidate);
            await context.SaveChangesAsync();
            return NoContent();
        
        }

        [HttpGet ("filter")  ]
        public async Task<ActionResult<List<CandidateDTO>>> Filter([FromQuery] FilterCandidatesDTO filterCandidatesDTO) {

            var candidateQuariable = context.Candidates.AsQueryable();

            if (!string.IsNullOrEmpty(filterCandidatesDTO.Name)) {
                candidateQuariable = candidateQuariable.Where(x => x.Name.Contains(filterCandidatesDTO.Name));
            }
            if (filterCandidatesDTO.SkillId != 0) {
                
                candidateQuariable = candidateQuariable.Where(x => x.CandidateSkills.Select(y => y.SkillId)
                .Contains(filterCandidatesDTO.SkillId));
                
            }

            var candidates = await candidateQuariable.OrderBy(x=>x.Name).ToListAsync();

            return mapper.Map<List<CandidateDTO>>(candidates);
        
        }












    }
}
