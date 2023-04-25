using HRPlatformApi.Helpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace HRPlatformApi.DTOs
{
    public class CandidateCreationDTO
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public int MobileNumber { get; set; }

        public string Email { get; set; }

        public DateTime Date { get; set; }
        [ModelBinder(BinderType =typeof(TypeBinder<List<int>>))]
        public List<int> SkillsIds { get; set; }

    }






}
