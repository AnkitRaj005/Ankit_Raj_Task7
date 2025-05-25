using MongoDB.Driver;

public class TodoService
{
  public readonly IMongoCollection<Todo> _todos;

  public TodoService(IConfiguration config)
  {
    var client = new MongoClient(config["MongoDB:ConnectionString"]);
    var database = client.GetDatabase(config["MongoDB:DatabaseName"]);
    _todos = database.GetCollection<Todo>(config["MongoDB:TodoCollection"]);
  }

  public async Task<Todo> CreateAsync(Todo todo)
  {
    await _todos.InsertOneAsync(todo);
    return todo;
  }

  public async Task<Todo> UpdateAsync(string id, Todo updatedTodo)
  {
    await _todos.ReplaceOneAsync(t => t.Id == id, updatedTodo);
    return updatedTodo;
  }

  public async Task<Todo?> DeleteAsync(string id)
  {
    var todo = await _todos.Find(t => t.Id == id).FirstOrDefaultAsync();
    if (todo == null) return null;

    await _todos.DeleteOneAsync(t => t.Id == id);
    return todo;
  }

  public async Task<List<Todo>> GetAllByUserIdAsync(string userId) =>
    await _todos.Find(t => t.OwnerId == userId).ToListAsync();

  public async Task<Todo> GetByIdAsync(string id) =>
      await _todos.Find(t => t.Id == id).FirstOrDefaultAsync();
}