public class User
{
    public int Id { get; set; }
    [ValidationEmail]
    public string? Email { get; set; }
    public string? Password { get; set; }
}