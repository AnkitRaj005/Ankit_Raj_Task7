using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace TaskFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
  private readonly TodoService _todoService;

  public TodoController(TodoService todoService)
  {
    _todoService = todoService;
  }

  private string? GetUserId() =>
    User.FindFirstValue(ClaimTypes.NameIdentifier);

  [HttpPost("create")]
  public async Task<IActionResult> createTodo([FromBody] Todo newTodo)
  {
    try
    {
      if (string.IsNullOrWhiteSpace(newTodo.Content))
      {
        return BadRequest("Content is Required.");
      }

      var userId = GetUserId();

      if (userId == null)
      {
        return BadRequest("You needed to login to create Todo");
      }

      newTodo.OwnerId = userId;
      newTodo.Content = newTodo.Content.Trim();
      newTodo.Completed = false;

      await _todoService.CreateAsync(newTodo);
      return Ok(newTodo);
    }
    catch (Exception ex)
    {
      throw;
    }
  }

  [HttpPost("update/{todoId}")]
  public async Task<IActionResult> updateTodo(string todoId, [FromBody] Todo updatedTodo)
  {
    try
    {
      var userId = GetUserId();

      if (userId == null)
      {
        return BadRequest("You needed to login to update Todo");
      }

      var existing = await _todoService.GetByIdAsync(todoId);

      if (existing == null || existing.OwnerId != userId)
        return Unauthorized();

      if (updatedTodo.Content != null)
        existing.Content = updatedTodo.Content;

      if (updatedTodo.Completed.HasValue)
        existing.Completed = updatedTodo.Completed.Value;

      existing.UpdatedAt = DateTime.UtcNow;

      await _todoService.UpdateAsync(todoId, existing);
      return Ok(existing);
    }
    catch (Exception ex)
    {
      throw;
    }
  }

  [HttpDelete("delete/{todoId}")]
  public async Task<IActionResult> deleteTodo(string todoId)
  {
    try
    {
      var userId = GetUserId();

      if (userId == null)
      {
        return BadRequest("You needed to login to delete Todo");
      }

      var existing = await _todoService.GetByIdAsync(todoId);

      if (existing == null || existing.OwnerId != userId)
        return Unauthorized();

      var res = await _todoService.DeleteAsync(todoId);

      return Ok(res);
    }
    catch (System.Exception)
    {

      throw;
    }
  }

  [HttpGet("get-all")]
  public async Task<IActionResult> getAllTodo()
  {
    var userId = GetUserId();

    if (userId == null)
    {
      return BadRequest("You needed to login to get all Todo");
    }

    var todos = await _todoService.GetAllByUserIdAsync(userId);
    return Ok(todos);
  }

}

