using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private TodoDbContext _context;

        public TodosController(TodoDbContext context)
        {
            _context = context;
            if (context.TodoItems.Count() == 0)
            {
                context.TodoItems.Add(new TodoItem
                {
                    Id = 1,
                    Name = "Wakup at 6",
                    Description = "This is a wake up at 6 description",
                    IsCompleted = false
                });
                context.TodoItems.Add(new TodoItem
                {
                    Id = 2,
                    Name = "Exercise at 7",
                    Description = "Exercise at 7",
                    IsCompleted = false
                });
                context.SaveChanges();
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> Get()
        {
            return await _context.TodoItems.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> Post(TodoItem item)
        {
             _context.TodoItems.Add(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TodoItem>> Put(int id, TodoItem item)
        {
            var toUpdate = await _context.TodoItems.FirstOrDefaultAsync(t => t.Id == id);
            if(toUpdate != null)
            {
                toUpdate.Description = item.Description;
                toUpdate.Name = item.Name;
                toUpdate.IsCompleted = item.IsCompleted;
                
                await _context.SaveChangesAsync();
                return Ok(toUpdate);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var toDelete = await _context.TodoItems.FirstOrDefaultAsync(t => t.Id == id);
            if (toDelete != null)
            {
                _context.Remove(toDelete);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
    }
}