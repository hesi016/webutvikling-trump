using Microsoft.AspNetCore.Mvc;
using TrumpVerseApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TrumpVerseApi.Controllers;

[ApiController]
[Route("api/[controller]")]

public class StaffController : ControllerBase
{
       private readonly TrumpContext context;

    public StaffController(TrumpContext _context)
    {
        context = _context;
    }
    // Hente ut data fra API
     [HttpGet]
    public async Task<ActionResult<List<TrumpStaff>>> GetStaff()
    {
        List<TrumpStaff> staff = await context.Staff.ToListAsync();
        return staff;
    }

    // Hente ut data fra Api via id til staff
    [HttpGet("{id}")]
    public async Task<ActionResult<TrumpStaff>> GetStaffById(int id)
    {
         TrumpStaff? trumpStaff = await context.Staff.FindAsync( id );
        if(trumpStaff!=null) {
            return Ok(trumpStaff);
        } else {
            return NotFound();
        }
    }

   // Hente ut data fra Api via statusen til staffet
    [HttpGet("status/{status}")] 
    public async Task<ActionResult<List<TrumpStaff>>> GetByStatus(string status)
    {   
        List<TrumpStaff> staff = await context.Staff
        .Where(t => t.Status == status)
        .ToListAsync();

        if (staff.Any()) {
            return Ok(staff);
        } else {
            return NotFound();
        }
    }

    // Legge til ny ansatt
    [HttpPost]
    public async Task<ActionResult<TrumpStaff>> AddStaff([FromBody] TrumpStaff newStaff)
    {
        if (newStaff == null || string.IsNullOrEmpty(newStaff.FirstName)  || string.IsNullOrEmpty(newStaff.LastName) ||string.IsNullOrEmpty(newStaff.Position) || string.IsNullOrEmpty(newStaff.Status) || string.IsNullOrEmpty(newStaff.ProfileImage))
        {
            return BadRequest("Could not add staff member.");
        }

        context.Staff.Add(newStaff);
        await context.SaveChangesAsync();
        return CreatedAtAction("GetStaffById", new {id=newStaff.Id}, newStaff);
    }  

    // Oppdatere ansatt basert på ID
    [HttpPut("{id}")]
    public async Task<ActionResult<TrumpStaff>> Put(int id, TrumpStaff updatedStaff) {
        TrumpStaff? staffToUpdate = await context.Staff.FindAsync(id);

        if(staffToUpdate == null)
        {
            return NotFound();
        }

        context.Entry(staffToUpdate).CurrentValues.SetValues(updatedStaff);
        context.Entry(staffToUpdate).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return NoContent();
    }

    // Slette ansatt basert på ID
    [HttpDelete("{id}")] 
    public async Task<ActionResult<TrumpStaff>> Delete(int id) {
          TrumpStaff? trumpStaff = await context.Staff.FindAsync( id );
          if(trumpStaff != null) {
            context.Staff.Remove(trumpStaff);
            await context.SaveChangesAsync();
          }
          return NoContent();
    }
}