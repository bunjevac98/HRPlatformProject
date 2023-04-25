using HRPlatformApi.Entities;
using HRPlatformApi;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore;
using HRPlatformApi.DTOs;
using AutoMapper;
using System.Linq;

namespace HRPlatformApi.Controllers
{
    [Route("api/skills")]
    [ApiController]
    public class SkillController:ControllerBase
    {
        private readonly ILogger<SkillController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public SkillController(ILogger<SkillController> logger,ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper= mapper;
        }



        [HttpGet]//api/skills
        public async  Task<ActionResult<List<SkillDTO>>> Get() {
            logger.LogInformation("Getting all skills");
            //vratice listu zanrova

            var skills= await context.Skills.ToListAsync();

            return mapper.Map<List<SkillDTO>>(skills);

        }







        //PAZITI NA VELIKO SLOVO MOZDA ZEZA
        [HttpGet("{Id:int}")] //api/skill/
        public async  Task<ActionResult<SkillDTO>> Get(int Id) {
            
            var skill = await context.Skills.FirstOrDefaultAsync(x => x.Id == Id);


            if (skill == null) { 
                return NotFound();
            }
            return mapper.Map<SkillDTO>(skill);

            
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] SkillCreationDTO skillCreationDTO)
        {

            var skill=mapper.Map<Skill>(skillCreationDTO);


            //obelezava objekat skill za dodavanje nije ga jos dodao
            context.Add(skill);
            //ovde mi dodajemo 
            await context.SaveChangesAsync();
            return NoContent();
        }

        
        [HttpPut("{Id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] SkillCreationDTO skillCreationDTO) {
            
            var skill= await context.Skills.FirstOrDefaultAsync(x=>x.Id==id);
            if(skill == null)
            {
                NotFound();
            }
            skill=mapper.Map(skillCreationDTO,skill);
            await context.SaveChangesAsync();
            return NoContent();


        }
        [HttpDelete("{Id:int}")]
        public async Task<ActionResult> Delete(int id) {

               var exists=await context.Skills.AnyAsync(x=>x.Id==id);
            if (!exists) { 
            return NotFound(); 
            }
            //Pravimo istancu skill klase gde prosledjujem metodu remove koja kaze da obelezi taj id koji cemo obrisati
            context.Remove(new Skill() { Id = id });
            await context.SaveChangesAsync();
            return NoContent(); 

        }


        //za filter
        [HttpGet("all")]
        public async Task<ActionResult<List<SkillDTO>>> GetFilter()
        {

            var skills = await context.Skills.OrderBy(x=>x.SkillName).ToListAsync();

            return mapper.Map<List<SkillDTO>>(skills);

        }
    }
}
