using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore.Metadata;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;


//Radjeno da bi mogli Skillsa da stavimo u Kandidata kako bi ga ovaj namapirao
namespace HRPlatformApi.Helpers
{
    public class TypeBinder<T> : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
           var propertyName= bindingContext.ModelName;
            var value=bindingContext.ValueProvider.GetValue(propertyName);

            if (value == ValueProviderResult.None)
            {
                return Task.CompletedTask;
            }
            else {

                try {
                    var deserializedValue = JsonConvert.DeserializeObject<T>(value.FirstValue);
                    bindingContext.Result = ModelBindingResult.Success(deserializedValue);
                }
                catch {
                    bindingContext.ModelState.TryAddModelError(propertyName, "The given value is not of correct type");
                }
            }
            return Task.CompletedTask;


        }
    }
}
