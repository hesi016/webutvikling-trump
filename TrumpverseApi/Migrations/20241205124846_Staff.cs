using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrumpVerseApi.Migrations
{
    /// <inheritdoc />
    public partial class Staff : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProfileName",
                table: "Staff",
                newName: "ProfileImage");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProfileImage",
                table: "Staff",
                newName: "ProfileName");
        }
    }
}
