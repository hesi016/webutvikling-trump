using System.ComponentModel.DataAnnotations;

namespace TrumpVerseApi.Models;

public class TrumpStaff : ITrumpStaff {

    [Key]
    public int Id { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Position { get; set; } = "";
    public string Status { get; set; } = "";
    public string ProfileImage { get; set; } = "";
    
}