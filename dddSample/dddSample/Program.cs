//net5 version of Program.cs (experienced)
//using dddSample;

//public class Program
//{
//    public static void Main(string[] args)
//    {
//        CreateHostBuilder(args).Build().Run();
//    }

//    public static IHostBuilder CreateHostBuilder(string[] args) =>
//        Host.CreateDefaultBuilder(args)
//            .ConfigureWebHostDefaults(webBuilder =>
//            {
//                webBuilder.UseStartup<Startup>();
//            });
//}

//net6 Version of Program.cs (unexperienced, still experimenting)
using Core.GenericRepository;
using Core.Interfaces;
using Core.Middleware;
using Core.Repositories;
using dddSample.Validators;
using Domain.Models;
using Domain.Validators;
using FluentValidation;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<HotelsDB>(options =>
    {
        options.UseSqlServer(connectionString);
    });

builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAll",
            b => b.AllowAnyHeader()
                .AllowAnyOrigin()
                .AllowAnyMethod());
    });

builder.Host.UseSerilog((ctx, lc) => lc.WriteTo.Console().ReadFrom.Configuration(ctx.Configuration));

builder.Services.AddScoped<IValidator<Country>, CountryValidator>();
builder.Services.AddScoped<IValidator<Hotel>, HotelValidator>();

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<ICountriesRepository, CountriesRepository>();
builder.Services.AddScoped<IHotelsRepository, HotelsRepository>();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

}

app.UseSerilogRequestLogging();

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors("AllowAll");

app.UseStaticFiles();
app.UseRouting();

app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();