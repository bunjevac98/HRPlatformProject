using HRPlatformApi.Entities;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using System.Security.Cryptography.X509Certificates;

namespace HRPlatformApi
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<CandidateSkills>().HasKey(x => new { x.SkillId, x.CandidateId });


        base.OnModelCreating(modelBuilder);
        
        }




        //Skills predstavlja ime nase tabele
        public DbSet<Skill> Skills { get; set; }

        //Naziv Tabele KOja ce se zvati candidates
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<CandidateSkills> CandidateSkills { get; set; }





    }
}
