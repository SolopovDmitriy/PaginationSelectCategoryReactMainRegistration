using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication13.Entities
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }


    }
}
