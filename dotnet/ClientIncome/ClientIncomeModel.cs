
using System.Collections.Generic;

namespace Models.Domain
{
    public class ClientIncome
    {
        public int Id { get; set; }
        public ClientBase Client { get; set; }
        public decimal AnnualIncome { get; set; }
        public decimal? Bonus { get; set; }
        public decimal? TaxRefund { get; set; }
        public decimal? Commissions { get; set; }
        public decimal? SpouseAnnualIncome { get; set; }
        public decimal? SpouseBonus { get; set; }
        public decimal? SpouseTaxRefund { get; set; }
        public decimal? SpouseCommissions { get; set; }
        public bool HasAdditionalIncome { get; set; }
        public List<ClientAdditionalIncome> AddIncome { get; set; }
        public BaseUser CreatedBy { get; set; }
        public int ModifiedBy { get; set; }

    }
}
