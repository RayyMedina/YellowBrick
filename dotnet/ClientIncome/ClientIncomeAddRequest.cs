using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Models.Requests
{
    public class ClientIncomeAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int ClientId { get; set; }

        [Required]
        public decimal AnnualIncome { get; set; }

        public decimal? Bonus { get; set; }

        public decimal? TaxRefund { get; set; }

        public decimal? Commissions { get; set; }

        public decimal? SpouseAnnualIncome { get; set; }

        public decimal? SpouseBonus { get; set; }

        public decimal? SpouseTaxRefund { get; set; }

        public decimal? SpouseCommissions { get; set; }

        [Required]
        public bool HasAdditionalIncome { get; set; }

    }
}
