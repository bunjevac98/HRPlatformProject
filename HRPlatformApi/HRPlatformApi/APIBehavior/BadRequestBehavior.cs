using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace HRPlatformApi.APIBehavior
{
    public class BadRequestBehavior
    {
        public static void Parse(ApiBehaviorOptions options) {

            var response = new List<string>();



            options.InvalidModelStateResponseFactory = context =>
            {
                foreach (var key in context.ModelState.Keys)
                {
                    foreach (var error in context.ModelState[key].Errors)
                    {
                        response.Add($"{key}:{error.ErrorMessage}");
                    }
                }
                return new BadRequestObjectResult(response);
            };
        
        }



    }
}
