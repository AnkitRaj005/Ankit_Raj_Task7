using Microsoft.AspNetCore.Mvc;

namespace YourNamespace.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class HelloController : ControllerBase
  {
    private readonly HttpClient _httpClient; // _httpClient is variable name

    public HelloController(HttpClient httpClient)
    {
      _httpClient = httpClient;
    }
    
    [HttpGet]
    public IActionResult GetHello()
    {
      return Ok("Hello from the controller!");
    }

    [HttpGet("{name}")]
    public IActionResult GetHelloWithName(string name)
    {
      return Ok($"Hello, {name}!");
    }

    [HttpGet("sum/{a}/{b}")]
    public IActionResult GetSum(int a, int b)
    {
      int result = a + b;
      return Ok(new { sum = result });
    }
    
    [HttpGet("posts")]
    public async Task<IActionResult> GetPostsFromExternalApi()
    {
      var url = "https://jsonplaceholder.typicode.com/posts/";
      var response = await _httpClient.GetAsync(url);

      if (!response.IsSuccessStatusCode)
        return StatusCode((int)response.StatusCode, "Error fetching posts");

      var content = await response.Content.ReadAsStringAsync();
      return Content(content, "application/json");
    }
  }
}