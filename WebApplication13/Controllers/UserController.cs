using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication13.Entities;
using WebApp.Models;
using Microsoft.Extensions.Logging;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private static ClinicDBContext _dBContext;
        public UserController(ILogger<CategoryController> logger)
        {
            _dBContext = new ClinicDBContext(new DbContextOptions<ClinicDBContext>());
        }


        [HttpPost]
        public string Create([FromBody] User user)
        {
         
            _dBContext.Users.Add(user);
            _dBContext.SaveChanges();
            return "ok";
        }


        //[HttpPost]
        //public async Task<ActionResult<Post>> Post([FromBody] string postSlug)
        //{
        //    return await _dBContext.Posts.SingleOrDefaultAsync(p => p.UrlSlug == postSlug);
        //}



    }
}
