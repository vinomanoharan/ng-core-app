using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private UserDbContext _context;
        public AuthController(UserDbContext context, TelemetryClient telemetry)
        {
            this._context = context;
            if (context.Users.Count() == 0)
            {
                context.Users.Add(new User { Id=1, Username="vino", Password="vino", IsAdmin=true });
                context.Users.Add(new User { Id=2, Username="john", Password="doe", IsAdmin=false });

                context.SaveChanges();

                telemetry.TrackEvent("Users were initialized..");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post(User user)
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => 
                                        u.Username == user.Username && 
                                        u.Password == user.Password);

            if(dbUser == null)
            {
                return NotFound();
            }

            dbUser.Password = "";
            return Ok(dbUser);
        }
    }
}
