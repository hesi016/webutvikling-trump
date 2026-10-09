using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TrumpContext>(
    options => options.UseSqlite("Data Source=TrumpVerse.db")
);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// CORS slik at Web Apiet kan brukes utenfor sitt eget domene

builder.Services.AddCors(
    options => {
        options.AddPolicy ("AllowAll", builder => 
        builder
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin()
        );
    }
); 


var app = builder.Build();


// Gjør det tilgjengelig for å bruke wwwroot
DefaultFilesOptions options = new DefaultFilesOptions();
options.DefaultFileNames.Add("index.html");
app.UseDefaultFiles(options);


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowAll");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
