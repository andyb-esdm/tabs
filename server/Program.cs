using Hubs;

var builder = WebApplication.CreateBuilder(args);
var corsPolicy = "CORSPolicy";

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicy, policy =>
    {
        policy
        .SetIsOriginAllowed(origin => true) //dynamic configuration
        // .WithOrigins("http://localhost:4200") //explicit configuration
        // .AllowAnyOrigin()    //does not work with allowcredentials, which signalr seems to require
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

builder.Services.AddSignalR();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(corsPolicy);

app.UseAuthorization();

app.MapControllers();

app.MapHub<TestHub>("/testHub");

app.Run();
