using Models.Domain;
using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests
{
    public class ClientAdditionalIncomeAddRequest
    {

        [Range(1, int.MaxValue)]
        public int AdditionalIncomeTypeId { get; set; }
        public int Amount { get; set; }
    }
}
