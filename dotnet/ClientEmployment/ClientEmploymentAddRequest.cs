using System;
using System.ComponentModel.DataAnnotations;


namespace Models.Requests
{
    public class ClientEmploymentAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int ClientId { get; set; }

        [Required]
        public bool isSelfEmployed { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        public string ClientOccupation { get; set; }


        [StringLength(200, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 0)]
        public string Employer { get; set; }

        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 0)]
        public string JobTitle { get; set; }


        public int? YearsEmployed { get; set; }

        [Required]
        public bool IsSpouseSelfEmployed { get; set; } 


        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 0)]
        public string SpouseOccupation { get; set; }

        [StringLength(200, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 0)]
        
         public string SpouseEmployer { get; set; }


        public int? SpouseYearsEmployed { get; set; }
    }
}
