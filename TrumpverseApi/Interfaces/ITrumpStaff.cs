namespace TrumpVerseApi.Models
{
    public interface ITrumpStaff
    {
        int Id { get; set; }
        string FirstName { get; set; } 
        string LastName { get; set; } 
        string Position { get; set; }
        string Status { get; set; } 
        string ProfileImage { get; set; }
    }
}