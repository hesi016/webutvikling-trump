using Microsoft.AspNetCore.Mvc;
namespace TrumpVerseApi.Controllers;

[ApiController]
[Route("[controller]")]

public class UploadImageController : ControllerBase
{
    private readonly IWebHostEnvironment hosting;
    public UploadImageController(IWebHostEnvironment _hosting)
    {
        hosting = _hosting;
    }

[HttpPost]
    public IActionResult SaveImage(IFormFile file)
    {
        if(file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }
        string wwwwrootPath = hosting.WebRootPath;
        string absolutePath = Path.Combine(wwwwrootPath, "images", file.FileName);

        var directory = Path.GetDirectoryName(absolutePath);
        if(!Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        using(var fileStream = new FileStream(absolutePath, FileMode.Create))
        {
            file.CopyTo(fileStream);
        }
        return Ok(new {FileName = file.FileName});
    }
}