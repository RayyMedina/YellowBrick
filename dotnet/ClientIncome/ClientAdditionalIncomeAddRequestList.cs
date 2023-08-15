using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests
{
    public class ClientIncomeWithAdditional : ClientIncomeAddRequest
    {
        public List<ClientAdditionalIncomeAddRequest> AddIncome { get; set; }

    }
}
